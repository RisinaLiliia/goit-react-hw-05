import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../tmdbApi';
import { toast } from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import MovieList from '../components/MovieList/MovieList';
import css from '../components/SearchForm/SearchForm.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(error);
        toast.error(`Error fetching movies: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <h1>Search Movies</h1>

      <Formik
        key={query}
        initialValues={{ query }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!values.query.trim()) {
            toast.error('Please enter a movie name.');
            setSubmitting(false);
            return;
          }
          setSearchParams({ query: values.query });
          toast.success(`Searching for "${values.query}"`);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ query, handleChange, isSubmitting }) => (
          <Form className={css.form}>
            <Field
              type="text"
              name="query"
              value={query}
              placeholder="Searching for movies..."
              className={css.input}
            />
            <button
              type="submit"
              className={css.button}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              Search
            </button>
          </Form>
        )}
      </Formik>

      {isLoading ? (
        <b>Loading movies...</b>
      ) : error ? (
        <b>
          {error.message || 'Whoops, there was an error. Please try again.'}
        </b>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
