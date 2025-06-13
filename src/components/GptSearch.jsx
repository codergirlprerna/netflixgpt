import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_URL } from '../utils/constants';


const GptSearch = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full -z-10">
        <img
          src={BG_URL}
          alt="Background"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="pt-24">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;
