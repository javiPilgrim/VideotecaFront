import { useState } from 'react';
import userService from '../services/users';
import { useNavigate } from 'react-router-dom';

const UserReg = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      name,
      username,
      password,
      email,
      online: false
    };

    try {
      await userService.newUser(newUser);
      setSuccess(true);
      setName('');
      setUsername('');
      setPassword('');
      setEmail('')
      setError(null);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError('Error al registrar el usuario');
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    navigate('/login')
  }

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Nombre de usuario:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          </div>
          <div>
          Email:
          <input
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <button type="submit">Registrarme</button>
        <button onClick={handleCancel}>Cancelar</button>
      </form>
      {success && <p>Usuario registrado con éxito! Redirigiendo al inicio de sesión...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserReg;