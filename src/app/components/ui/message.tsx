// src/components/Message.jsx
import React from 'react';

interface MessageProps {
  role: 'user' | 'bot';
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={`message ${role === 'user' ? 'user' : 'bot'}`}>
      <div className='text'>{content}</div>
    </div>
  );
};

export default Message;
