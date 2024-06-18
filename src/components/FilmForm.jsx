import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import filmService from '../services/films';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const FilmForm = ({ updateNotification }) => {
  const [filmData, setFilmData] = useState({
    titulo: '',
    director: '',
    genero: '',
    año: '',
    sinopsis: ''
  });
  const [actor1, setActor1] = useState('');
  const [actor2, setActor2] = useState('');
  const [actor3, setActor3] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const actores = [actor1, actor2, actor3];
    const newFilm = {
      id: Math.round(Math.random() * 1000000).toString(),
      buena: 0,
      mala: 0,
      vista: false,
      actores: actores,
      ...filmData
    };

    try {
      await filmService.newFilm(newFilm);
      setFilmData({
        titulo: '',
        director: '',
        genero: '',
        año: '',
        sinopsis: ''
      });
      setActor1('');
      setActor2('');
      setActor3('');
      updateNotification('La película se ha agregado correctamente', 'success');
      navigate('/');
    } catch (error) {
      updateNotification('Error al agregar la película', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilmData({ ...filmData, [name]: value });
  };

  const handleActorChange1 = (event) => {
    setActor1(event.target.value);
  };

  const handleActorChange2 = (event) => {
    setActor2(event.target.value);
  };

  const handleActorChange3 = (event) => {
    setActor3(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Nueva Película
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Titulo"
              name="titulo"
              value={filmData.titulo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Director"
              name="director"
              value={filmData.director}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Actor 1"
              name="actor1"
              value={actor1}
              onChange={handleActorChange1}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Actor 2"
              name="actor2"
              value={actor2}
              onChange={handleActorChange2}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Actor 3"
              name="actor3"
              value={actor3}
              onChange={handleActorChange3}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genero"
              name="genero"
              value={filmData.genero}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Año"
              name="año"
              value={filmData.año}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sinopsis"
              name="sinopsis"
              value={filmData.sinopsis}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Agregar Película
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary" sx={{ ml: 2 }}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FilmForm;