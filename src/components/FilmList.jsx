import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import filmService from "../services/films";
import './FilmList.css';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userToken, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      const initialFilms = await filmService.getAll();
      initialFilms.sort((a, b) => a.titulo.localeCompare(b.titulo));
      setFilms(initialFilms);
    };
    fetchFilms();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  },[]);

  const toggleVista = async (id) => {
    const film = films.find(f => f.id === id);
    const updatedFilm = { ...film, vista: !film.vista };
    await filmService.updateFilm(id, updatedFilm);
    setFilms(films.map(f => (f.id === id ? updatedFilm : f)));
  };

  const deleteFilm = async (id) => {
    const film = films.find(f => f.id === id);
    const response = confirm(`¿Realmente quiere borrar la película "${film.titulo}"?`);
    if (response) {
      await filmService.deleteFilm(id);
      setFilms(films.filter(f => f.id !== id));
    }
  };

  const filteredFilms = films.filter(film => {
    if (filter === 'all') return true;
    if (filter === 'vistas') return film.vista;
    if (filter === 'no-vistas') return !film.vista;
    return true;
  });

  const ListItem = styled('li')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  });

  const FilmTitle = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    flexGrow: 1,
  });

  const SmallButton = styled(Button)({
    fontSize: '0.75rem', // Reduce el tamaño de la fuente de los botones
  });

  return (
    <div>
      <h2>Listado de Películas</h2>
      <h4>{films.length} peliculas incorporadas</h4>
      <div className="filters">
        <Button variant="contained" onClick={() => setFilter('all')}>Todas</Button>
        <Button variant="contained" onClick={() => setFilter('vistas')}>Vistas</Button>
        <Button variant="contained" onClick={() => setFilter('no-vistas')}>No Vistas</Button>
      </div>
      <ul>
        {filteredFilms.map(film => (
          <ListItem key={film.id}>
            <FilmTitle to={`/pelicula/${film.id}`}>{film.titulo}</FilmTitle>
            <SmallButton 
              variant="contained" 
              size="small" 
              onClick={() => toggleVista(film.id)}
            >
              {film.vista ? 'Vista' : 'No Vista'}
            </SmallButton>
            {userId === 2234 && (
              <IconButton 
                aria-label="delete" 
                size="small" 
                onClick={() => deleteFilm(film.id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;