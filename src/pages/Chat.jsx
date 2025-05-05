import React, { useState } from 'react';
import { sendMessage, logoutUser } from '../api/api.js';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewMessage = async (message, sender = 'user') => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender },
    ]);

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token de autenticação não encontrado');
        setIsLoading(false);
        return;
      }

      const response = await sendMessage(message, token);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: response || 'Bot está offline. Tente mais tarde.',
          sender: 'bot',
        },
      ]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Erro ao se comunicar com o servidor.', sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await logoutUser(token);
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white py-4 vh-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">FURIA Chatbot</h4>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          Logout
        </button>
      </div>

      <div className="flex-grow-1 overflow-auto bg-black p-3 rounded mb-3 border border-warning">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user'
                ? 'bg-warning text-dark text-end ms-auto'
                : 'bg-secondary text-white text-start me-auto'
            }`}
            style={{ maxWidth: '75%' }}
          >
            {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="text-center text-muted mt-2">
            <small>Carregando resposta...</small>
          </div>
        )}
      </div>

      <ChatInput onNewMessage={handleNewMessage} />
    </div>
  );
};

export default Chat;
