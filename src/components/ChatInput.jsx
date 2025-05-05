import React, { useState } from 'react';
import { sendMessage } from '../api/api.js';

const ChatInput = ({ onNewMessage }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      onNewMessage(input, 'user');

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token de autenticação não encontrado.');
        setIsLoading(false);
        return;
      }

      const response = await sendMessage(input, token);
      onNewMessage(response, 'bot');

      setInput('');
    } catch (error) {
      console.error('Erro ao enviar a mensagem', error);

      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Erro desconhecido ao se comunicar com o servidor.');
      }

      onNewMessage('Erro ao se comunicar com o servidor.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="btn btn-warning fw-bold"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default ChatInput;
