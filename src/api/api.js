import axios from 'axios';

// Instância da API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

// Recupera o token armazenado
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Header de autorização com token
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

// Login do usuário
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};

// Logout do usuário
export const logoutUser = async (token) => {
  try {
    const response = await api.post('/logout', {}, authHeader(token));
    localStorage.removeItem('token'); // Remove token localmente
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer logout');
  }
};

// Criar conversa
export const createConversation = async (token) => {
  try {
    const response = await api.post('/start-conversation', {}, authHeader(token));
    return response.data.conversation_id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao iniciar conversa');
  }
};

// Enviar mensagem
export const sendMessage = async (message, token, conversation_id = null) => {
  try {
    const convId = conversation_id || await createConversation(token);

    const response = await api.post(
      '/send-message',
      { message, conversation_id: convId },
      authHeader(token)
    );

    return response.data.bot_response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao enviar mensagem');
  }
};
