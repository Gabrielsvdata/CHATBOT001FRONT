import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro no registro:', error);
      if (error.response?.data?.errors) {
        const messages = Object.values(error.response.data.errors).flat().join('\n');
        alert(`Erro ao registrar:\n${messages}`);
      } else {
        alert('Erro ao registrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <form
        className="bg-warning p-4 rounded shadow-lg w-100"
        style={{ maxWidth: '400px' }}
        onSubmit={handleRegister}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">FURIA Cadastro</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirmar senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 fw-bold mb-3">
          Cadastrar
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="btn btn-link text-dark text-decoration-none d-block text-center"
        >
          Já tem uma conta? Login
        </button>
      </form>
    </div>
  );
}
