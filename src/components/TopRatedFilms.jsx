import React, { useEffect, useState } from 'react';
import filmService from '../services/films';

const TopRatedFilms = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await filmService.getAll();
        if (response && Array.isArray(response)) {
          const sortedFilms = response
            .sort((a, b) => b.buena - a.buena)
            .slice(0, 10);
          setFilms(sortedFilms);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError('Error fetching films: ' + err.message);
      }
    };

    fetchFilms();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Películas Más Valoradas</h2>
      <ul>
        {films.map((film) => (
          <li key={film.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img
              src={`/images/${film.id}.jpg`}
              alt={film.titulo}
              style={{ marginRight: '10px', width: '50px', height: '75px' }}
            />
            <div>
              <h3>{film.titulo}</h3>
              <p>Director: {film.director}</p>
              <p>Valoración: {film.buena}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedFilms;