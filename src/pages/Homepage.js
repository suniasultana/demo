import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTrending() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        if (isMounted) {
          setMovies(data.results || []);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load trending movies.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTrending();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="page">
      <h1>Trending Movies</h1>

      {loading && <p>Loading trending movies...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {!loading && !error && movies.length === 0 && (
        <p>No trending movies found.</p>
      )}
    </section>
  );
}

export default HomePage;