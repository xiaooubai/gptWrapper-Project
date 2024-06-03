import React, { useEffect, useState } from 'react';

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
  role: 'user' | 'bot' | 'system';
  content: string | JSX.Element;
}

export function TextareaWithButton() {
  const handleFormSubmit = (placesData: Place[]) => {
    setItems((items) => [
      ...items,
      {
        role: 'bot',
        content: 'Here are some places that match your criteria:',
      },
      ...placesData,
    ]);
  };

  const [items, setItems] = useState<(Message | Place)[]>([
    {
      role: 'system',
      content: <EventDetailsForm onFormSubmit={handleFormSubmit} />,
    },
  ]);
  const [input, setInput] = useState('');
  const [apiMessages, setApiMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initialMessage =
      "We're talking writing a modern Canadian version of the Romance of the Three Kingdoms as a graphic novel";
    const initialApiMessage: Message = {
      role: 'user',
      content: initialMessage,
    };
    setApiMessages([initialApiMessage]);

    const sendInitialMessage = async () => {
      const requestBody = {
        messages: [initialApiMessage],
      };
      console.log('Request body:', JSON.stringify(requestBody)); // Debugging

      try {
        const response = await fetch('/api/gpt4', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        // Debugging
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
        }

        // No need to handle response, we're only setting context
      } catch (error) {
        console.error('Error:', error);
      }
    };

    sendInitialMessage();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    const updatedApiMessages = [...apiMessages, newMessage];

    setApiMessages(updatedApiMessages);
    setItems([...items, newMessage]);
    setInput('');

    try {
      const response = await fetch('/api/gpt4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedApiMessages
            .filter((msg) => typeof msg.content === 'string') // Filter out non-string content
            .map((msg) => ({
              role: msg.role,
              content: msg.content as string, // Type assertion to ensure content is string
            })),
        }),
      });

      const data = await response.json();
      const botMessage: Message = { role: 'bot', content: data.response };

      setApiMessages((apiMessages) => [...apiMessages, botMessage]);
      setItems((items) => [...items, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {items.map((item, index) => {
          if ('role' in item) {
            // Render message
            return item.role === 'system' ? (
              <div key={index}>{item.content}</div>
            ) : (
              <Message
                key={index}
                role={item.role}
                content={item.content as string}
              />
            );
          } else {
            // Render place map
            return <Maps key={index} place={item} />;
          }
        })}
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
