import React from 'react';

const MessageBubble = ({ message, sender }) => {
  const isUser = sender === 'user';

  return (
    <div className={`d-flex mb-2 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div
        className={`p-2 rounded shadow-sm ${
          isUser ? 'bg-warning text-dark' : 'bg-secondary text-white'
        }`}
        style={{ maxWidth: '75%', wordBreak: 'break-word' }}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageBubble;
