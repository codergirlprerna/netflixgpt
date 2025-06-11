import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useMovieTrailer = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await data.json();
        console.log(json);

        const trailers = json.results.filter(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        const selectedTrailer = trailers.length ? trailers[0] : json.results[0];
        setTrailerKey(selectedTrailer?.key);
      } catch (err) {
        console.error('Error fetching movie videos:', err);
      }
    };

    if (movieId) {
      getMovieVideos();
    }
  }, [movieId]);

  return trailerKey; 
};

export default useMovieTrailer;
