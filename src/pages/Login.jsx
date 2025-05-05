import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Email ou senha inválidos');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <form
        className="bg-warning p-4 rounded shadow-lg w-100"
        style={{ maxWidth: '400px' }}
        onSubmit={handleLogin}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">FURIA Login</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 fw-bold mb-3">
          Entrar
        </button>

        <button
          type="button"
          onClick={goToRegister}
          className="btn btn-link text-dark text-decoration-none d-block text-center"
        >
          Não tem uma conta? Registrar
        </button>
      </form>
    </div>
  );
}
