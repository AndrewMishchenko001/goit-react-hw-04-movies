// import PropTypes from 'prop-types';

const BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = '9f052bf1a80b36b24618f47f3bf5703f';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/all/day?api_key=${API_KEY}`,
  );
}

export function fetchMoviesByKeyWord(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`,
  );
}

export function fetchMoviesFullInfo(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`,
  );
}

export function fetchMoviesActorsInfo(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`,
  );
}

export function fetchMoviesReview(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
}
