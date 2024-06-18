import { useState } from 'react';
import userService from '../services/users';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification'; // Importar el componente de notificación

const LoginForm = ({ setToken, setUsername, setUserId, updateNotification }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const users = await userService.getAll();
      const user = users.find(u => u.name === name && u.password === password);
      if (user) {
        const token = generateToken(user);
        localStorage.setItem('userToken', token);
        localStorage.setItem('username', user.name);
        localStorage.setItem('userId', user.id);
        setToken(token);
        setUsername(user.name);
        setUserId(user.id);
        await userService.updateUser(user.id, { ...user, online: true });
        navigate('/');
        updateNotification('Login successful!', 'success');
      } else {
        setName('');
        setPassword('');
        setError('El nombre o contraseña introducidos son incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  const generateToken = (user) => {
    return btoa(`${user.name}:${user.id}`);
  };

  const handleRegisterClick = () => {
    navigate('/registrarse');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
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
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿Nuevo usuario? <button onClick={handleRegisterClick}>Regístrate aquí</button></p>
      {error && <Notification notification={error} type="error" />} {/* Mostrar la notificación de error aquí */}
    </div>
  );
};

export default LoginForm;