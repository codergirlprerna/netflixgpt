import React from 'react';
import useMovieTrailer from '../hooks/useMovieTrailer'; // make sure the path is correct

const VideoBackground = ({ movieId }) => {
  const trailerKey = useMovieTrailer(movieId); // ✅ use the value returned from the hook

  if (!trailerKey) return null; // ✅ optional: prevent rendering if not ready

  return (
    <div className='w-screen'>
      <iframe
      className='w-screen aspect-video'
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
