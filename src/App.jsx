import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FilmForm from './components/FilmForm';
import FilmList from './components/FilmList';
import FilmDetail from './components/FilmDetail';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import UserView from './components/UserView';
import UserReg from './components/UserReg';
import TopRatedFilms from './components/TopRatedFilms';
import LeastRatedFilms from './components/LeastRatedFilms';
import Notification from './components/Notification';
import userService from './services/users';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
    setLoading(false);
  }, []);

  const updateNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => setNotification(null), 5000); // Ocultar la notificación después de 5 segundos
  };

  const handleLogout = async () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setToken(null);
    setUsername(null);
    setUserId(null);
    const user = await userService.getById(userId);
    await userService.updateUser(userId, { ...user, online: false });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        {username === null ? (
          <Routes>
            <Route path="/login" element={<LoginForm setToken={setToken} setUsername={setUsername} setUserId={setUserId} updateNotification={updateNotification} />} />
            <Route path="/registrarse" element={<UserReg updateNotification={updateNotification} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <div>
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{username} is Login</span>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <nav className="navbar">
              <Link to="/">Home</Link>
              {token && <Link to="/usuarios">Usuarios</Link>}
              {userId === 2234 && <Link to="/nuevaPelicula">Agregar Película</Link>}
              <Link to="/mas-valoradas">Más Valoradas</Link>
              <Link to="/menos-valoradas">Menos Valoradas</Link>
              {!token && <Link to="/login">Iniciar Sesión</Link>}
            </nav>
            <div>
              {notification && <Notification notification={notification} type={notificationType} />}
              <h1>LA VIDEOTECA DE JAVI</h1>
            </div>
            <Routes>
              <Route path="/" element={<FilmList />} />
              <Route path="/nuevaPelicula" element={token && userId === 2234 ? <FilmForm updateNotification={updateNotification} /> : <Navigate to="/" />} />
              <Route path="/pelicula/:id" element={<FilmDetail updateNotification={updateNotification} />} />
              <Route path="/user/:id" element={<UserView />} />
              <Route path="/login" element={<LoginForm setToken={setToken} setUsername={setUsername} setUserId={setUserId} updateNotification={updateNotification} />} />
              {token && <Route path="/usuarios" element={<UserList />} />}
              <Route path="/mas-valoradas" element={<TopRatedFilms />} />
              <Route path="/menos-valoradas" element={<LeastRatedFilms />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </Router>
      <footer>
        Javi Macías Proyect
      </footer>
    </>
  );
}

export default App;