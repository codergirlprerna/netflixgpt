import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div>
      <div className='bg-black'>
        <h1 className='text-white'>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
