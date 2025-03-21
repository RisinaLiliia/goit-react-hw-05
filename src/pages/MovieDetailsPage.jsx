import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../tmdbApi';
import { FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import css from './MovieDetailsPage.module.css';

const defaultImg = 'https://via.placeholder.com/250x375?text=No+Image';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        toast.error('Error fetching movie details:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (isLoading) return <p>Loading movie details...</p>;
  if (error) return <p>Failed to load movie. Please try again later.</p>;
  if (!movie) return <p>No movie data available.</p>;

  return (
    <div>
      <Link to={backLink.current} className={css.backBtn} state={{ location }}>
        <FaArrowLeft /> Go Back
      </Link>
      <div className={css.movie}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          width="250"
        />
        <div>
          <h1 className={css.title}>{movie.title}</h1>
          <p>
            <b>User Score:</b> {movie.userScore}%
          </p>
          <p>{movie.overview || 'No overview available.'}</p>
          <p>
            <b>Genres:</b>{' '}
            {Array.isArray(movie.genres) && movie.genres.length
              ? movie.genres.map((g) => g.name).join(', ')
              : 'No genres available.'}
          </p>
        </div>
      </div>

      <h3>Additional Information</h3>
      <ul className={css.additional}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
