import React, { useState } from 'react';

import { Button } from './button';
import { Textarea } from './input';
import Message from './message';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function TextareaWithButton() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((messages) => [...messages, { role: 'user', content: input }]);
    setInput('');

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: input }),
      });

      const { botMessage } = await response.json();

      setMessages((messages) => [
        ...messages,
        { role: 'bot', content: botMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
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
