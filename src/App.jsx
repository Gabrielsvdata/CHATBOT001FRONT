import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import './App.css';

// Função de proteção para verificar se o usuário está logado
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Se não estiver logado, redireciona para o login
    return <Navigate to="/" />;
  }
  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protege a rota de chat */}
        <Route path="/register" element={<Register />} />
        {/* Protege a rota de chat */}
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
      </Routes>
    </Router>
  );
}

export default App;
