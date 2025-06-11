import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPopularMovies = async () => {
        try {
            console.log("🎯 Fetching popular movies...");
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/popular?page=1", // ✅ CORRECTED URL
                API_OPTIONS
            );
            if (!response.ok) throw new Error("Failed to fetch popular movies");
            const json = await response.json();
            console.log("🎬 Popular Movies Fetched:", json.results);
            dispatch(addPopularMovies(json.results));
        } catch (err) {
            console.error("❌ Error fetching popular movies:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPopularMovies();
    }, []);

    return { loading, error };
};

export default usePopularMovies;
