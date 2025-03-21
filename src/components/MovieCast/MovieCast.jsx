import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../tmdbApi";
import toast from "react-hot-toast";
import styles from "./MovieCast.module.css";

const defaultImg = "https://placehold.co/150x150?text=No+Photo";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError("Failed to load cast. Please try again later.");
        toast.error("Error fetching movie cast:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.cast}>
      <h3>Cast</h3>
      {cast.length === 0 ? (
        <p>No cast information available.</p>
      ) : (
        <ul className={styles.castList}>
          {cast.map(({ id, name, profile_path }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : defaultImg
                }
                alt={name}
                width="100"
              />
              <p>{name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
