import React, { useEffect, useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { getMovieDetails, getSimilarMovies, getPosterUrl } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
  let isMounted = true;

  async function loadMovie() {
    try {
      setLoading(true);

      // 1) Always get movie details
      const detailsData = await getMovieDetails(id);

      // 2) Try to get similar movies, but don't break page if it fails
      let similarData = { results: [] };
      try {
        similarData = await getSimilarMovies(id);
      } catch (e) {
        console.error("Failed to load similar movies:", e);
      }

      if (isMounted) {
        setMovie(detailsData);
        setSimilar(similarData.results || []);
        setError("");
      }
    } catch (err) {
      if (isMounted) {
        console.error("Movie details error:", err);
        setError(err.message || "Failed to load movie details.");
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  }

  loadMovie();

  return () => {
    isMounted = false;
  };
}, [id]);

  if (loading) {
    return (
      <section className="page">
        <p>Loading movie details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <p className="error">{error}</p>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="page">
        <p>Movie not found.</p>
      </section>
    );
  }

  const poster = getPosterUrl(movie.poster_path);

  return (
    <section className="page">
      <div className="movie-details">
        {poster && (
          <div className="movie-details-poster">
            <img src={poster} alt={movie.title} />
          </div>
        )}

        <div className="movie-details-content">
          <h1>{movie.title}</h1>
          <p className="movie-meta">
            Release date: {movie.release_date || "N/A"} | Rating:{" "}
            {movie.vote_average?.toFixed(1) || "N/A"}
          </p>

          {/* Tabs navigation (nested routes) */}
          <nav className="tabs">
            <NavLink
              to=""
              end
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Overview
            </NavLink>
            <NavLink
              to="cast"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Cast
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Reviews
            </NavLink>
            <NavLink
              to="trailer"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Trailer
            </NavLink>
          </nav>

          {/* Nested routes content */}
          <div className="tab-content">
            <Outlet context={{ movie }} />
          </div>
        </div>
      </div>

      {/* Similar movies section */}
      <div className="similar-section">
        <h2>Similar Movies</h2>
        <div className="movies-grid">
          {similar.map((m) => (
            <MovieCard movie={m} key={m.id} />
          ))}
        </div>
        {similar.length === 0 && <p>No similar movies found.</p>}
      </div>

      
    </section>
  );
}

export default MoviePage;