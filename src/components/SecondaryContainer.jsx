import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const { nowPlayingMovies, popularMovies } = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-40 relative z-20">
        <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
        <MovieList title={"Popular"} movies={popularMovies} />
        <MovieList title={"Trending"} movies={nowPlayingMovies} />
        <MovieList title={"Horror Movies"} movies={nowPlayingMovies} />
        <MovieList title={"Upcoming Movies"} movies={nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
