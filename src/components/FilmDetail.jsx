import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import filmService from "../services/films";

const FilmDetail = ({ updateNotification }) => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      const fetchedFilm = await filmService.getAll();
      const filmDetail = fetchedFilm.find(film => film.id === id);
      setFilm(filmDetail);
    };
    fetchFilm();
  }, [id]);

  const incrementGood = async () => {
    const updatedFilm = { ...film, buena: film.buena + 1 };
    await filmService.updateFilm(id, updatedFilm);
    setFilm(updatedFilm);
    updateNotification('Te gustó esta película', 'success');
  };

  const incrementBad = async () => {
    const updatedFilm = { ...film, mala: film.mala + 1 };
    await filmService.updateFilm(id, updatedFilm);
    setFilm(updatedFilm);
    updateNotification('No te gustó esta película', 'error');
  };

  if (!film) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{film.titulo}</h2>
      <p><strong>Director:</strong> {film.director}</p>
      <img src={`/images/${film.id}.jpg`} alt={film.titulo} style={{ marginRight: '10px' }} />
      <p><strong>Género:</strong> {film.genero}</p>
      <p><strong>Año:</strong> {film.año}</p>
      <p><strong>Sinopsis:</strong> {film.sinopsis}</p>
      <p><strong>Actores:</strong> {film.actores.join(", ")}</p>
      <div>
        <button onClick={incrementGood}>👍</button>
        <span>{film.buena}</span>
        <button onClick={incrementBad}>👎</button>
        <span>{film.mala}</span>
      </div>
    </div>
  );
};

export default FilmDetail;