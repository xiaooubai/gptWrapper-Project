import React, { useState } from 'react';

import { Button } from './button';
import { Textarea } from './text';

function ChatWithGPT() {
  const [messages, setMessages] = useState<{ role: string; content: any }[]>(
    [],
  ); // Stores all chat messages

  const [input, setInput] = useState(''); // Tracks the current input field

  // Declare the 'data' variable
  const data = { reply: '' };

  // Function to handle sending messages
  const sendMessage = async () => {
    setMessages([...messages, { role: 'bot', content: data.reply }]);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='overflow-y-auto p-4 space-y-2'>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className='text'>{msg.content}</div>
          </div>
        ))}
      </div>
      <div className='p-2'>
        <Textarea
          placeholder='Type your message here...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}

export default ChatWithGPT;
