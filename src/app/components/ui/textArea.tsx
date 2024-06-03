import React, { useState } from 'react';

import Maps from '@/app/components/maps';
import EventDetailsForm from '@/app/components/ui/eventForm';
import { Place } from '@/app/types/Places';

import { Button } from './button';
import Message from './message';
import { Textarea } from './text';

interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: {
    displayName: string;
    uri: string;
    photoUri: string;
  }[];
}

interface Message {
  role: 'user' | 'bot' | 'system'; // 'system' for special messages like forms
  content: string | JSX.Element; // Allow content to be a string or JSX.Element
}

export function TextareaWithButton() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [input, setInput] = useState('');

  const handleFormSubmit = (placesData: Place[]) => {
    setPlaces(placesData);
    setMessages((messages) => [
      ...messages,
      {
        role: 'bot',
        content: 'Here are some places that match your criteria:',
      },
    ]);
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: <EventDetailsForm onFormSubmit={handleFormSubmit} />,
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((messages) => [...messages, { role: 'user', content: input }]);
    setInput('');

    try {
      const response = await fetch('/api/gpt4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const { response: botMessage, places: fetchedPlaces } =
        await response.json();

      setMessages((messages) => [
        ...messages,
        { role: 'bot', content: botMessage }, // Ensure role is 'bot'
      ]);
      if (fetchedPlaces) {
        setPlaces(fetchedPlaces); // Update places state with fetched data
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {messages.map((msg, index) =>
          msg.role === 'system' ? (
            <div key={index}>{msg.content}</div>
          ) : (
            <Message
              key={index}
              role={msg.role}
              content={msg.content as string}
            />
          ),
        )}
        {places.map((place, index) => (
          <Maps key={index} place={place} />
        ))}
      </div>
      <div className='p-2 border-t border-gray-300'>
        <Textarea
          placeholder='Type your message here...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='mb-2'
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
