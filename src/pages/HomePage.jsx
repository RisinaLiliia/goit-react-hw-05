import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../tmdbApi";
import toast from "react-hot-toast";

import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
