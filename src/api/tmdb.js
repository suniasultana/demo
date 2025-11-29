const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

async function fetchFromTMDB(endpoint, params = "") {
  const tmdbUrl = `${TMDB_BASE_URL}${endpoint}?api_key=${API_KEY}${params}`;
  const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(tmdbUrl)}`;

  console.log("Requesting:", proxiedUrl);

  const res = await fetch(proxiedUrl);

  if (!res.ok) {
    const text = await res.text();
    console.error("TMDB raw error:", res.status, text);
    throw new Error("Failed to fetch");
  }

  return res.json();
}


export function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/day");
}


export function searchMovies(query) {
  const encoded = encodeURIComponent(query);
  return fetchFromTMDB("/search/movie", `&query=${encoded}`);
}


export function getMovieDetails(id) {
  return fetchFromTMDB(`/movie/${id}`);
}


export function getMovieCredits(id) {
  return fetchFromTMDB(`/movie/${id}/credits`);
}


export function getMovieReviews(id) {
  return fetchFromTMDB(`/movie/${id}/reviews`);
}


export function getSimilarMovies(id) {
  return fetchFromTMDB(`/movie/${id}/similar`);
}


export function getPosterUrl(path, size = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getMovieVideos(id) {
  return fetchFromTMDB(`/movie/${id}/videos`);
}

