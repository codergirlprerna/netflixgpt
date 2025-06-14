import { useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";
import { useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

// ✅ Fix: Safely access the env variable
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [error, setError] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFromOpenRouter = async (query) => {
    if (!OPENROUTER_API_KEY) throw new Error("❌ Missing OpenRouter API Key");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // you can change this to "mistralai/mistral-7b-instruct" if needed
        messages: [{ role: "user", content: query }],
      }),
    });

    if (!response.ok) throw new Error(`OpenRouter failed: ${response.status}`);
    const data = await response.json();
    return data?.choices?.[0]?.message?.content;
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    const gptQuery =
      "Act as a movie recommendation system and suggest 10 movies for the query: " +
      query +
      ". Only give me the names of the movies, comma-separated. Example: Inception, Interstellar, Sholay, Dangal, The Dark Knight, Gadar, Avatar, Iron Man, Bajrangi Bhaijaan, The Matrix";

    setLoading(true);
    setError(null);
    setRecommendedMovies([]);

    let movieNames = [];

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const text = gptResults.choices?.[0]?.message?.content;
      console.log("✅ OpenAI Response:", text);
      movieNames = text.split(",").map((name) => name.trim()).slice(0, 10);
    } catch (err) {
      console.warn("⚠️ OpenAI failed:", err.message);

      try {
        const fallbackText = await fetchFromOpenRouter(gptQuery);
        console.log("✅ OpenRouter Response:", fallbackText);
        movieNames = fallbackText.split(",").map((name) => name.trim()).slice(0, 10);
      } catch (openrouterError) {
        console.error("❌ OpenRouter also failed:", openrouterError.message);
        setError("All AI APIs failed. Please try again later.");
        setLoading(false);
        return;
      }
    }

    try {
      const fetchedMovies = [];
      for (const name of movieNames) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}`,
          API_OPTIONS
        );
        const data = await response.json();
        if (data?.results?.[0]?.poster_path) {
          fetchedMovies.push(data.results[0]);
        }
      }
      setRecommendedMovies(fetchedMovies);
    } catch (err) {
      console.error("❌ TMDB Fetch Failed:", err.message);
      setError("TMDB API fetch failed.");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/your-background.jpg')",
      }}
    >
      <div className="pt-16 flex flex-col items-center px-4 relative z-10">
        <form
          className="p-2 m-3 bg-black w-full max-w-3xl grid grid-cols-12 gap-2 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            placeholder={lang[langKey].gptSearchPlaceholder}
            className="col-span-9 px-3 py-2 text-black rounded placeholder-gray-500 bg-white text-sm"
          />
          <button
            type="submit"
            className="col-span-3 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>

        {loading && <p className="text-white mt-4">Loading recommendations...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {recommendedMovies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 w-full max-w-7xl">
            {recommendedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 bg-opacity-90 rounded-lg overflow-hidden shadow-lg text-white hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={IMG_CDN_URL + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-bold text-md">{movie.title}</h3>
                  <p className="text-xs text-gray-300">{movie.release_date?.slice(0, 4)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GptSearchBar;
