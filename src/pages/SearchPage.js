import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    let isMounted = true;

    async function doSearch() {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        if (isMounted) {
          setMovies(data.results || []);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to search movies.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    doSearch();
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <section className="page">
      <h1>Search Results</h1>
      <p className="subheading">
        Showing results for: <strong>{query || "—"}</strong>
      </p>

      {!query && <p>Type something in the search bar to find movies.</p>}

      {loading && <p>Searching...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found for that search.</p>
      )}
    </section>
  );
}

export default SearchPage;
