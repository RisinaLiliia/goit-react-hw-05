import axios from "axios";

const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjZmYjZiNWRiODFkNDM1MDE5ODI4MDI0N2M3YjkzYSIsIm5iZiI6MTc0MjIwMDIwMi41MTcsInN1YiI6IjY3ZDdkZDhhNTk2M2ViZmZkZTdjMmI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gKmh8Bt0_jpLIPmgmtJQIM5jMSMojmlrNYzun4T72Dk";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      ...options,
      params: {
        query: query,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
    const movieData = response.data;
    const userScore = movieData.vote_average
      ? (movieData.vote_average * 10).toFixed(1)
      : "N/A";

    return {
      ...movieData,
      userScore,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits`,
      options
    );
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};
