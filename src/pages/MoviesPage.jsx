import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../tmdbApi";
import toast from "react-hot-toast";
import MovieList from "../components/MovieList/MovieList";
import SearchForm from "../components/SearchForm/SearchForm";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(true);
        toast.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ query });
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Whoops, there was an error. Please try again.</b>}
      <SearchForm onSubmit={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
