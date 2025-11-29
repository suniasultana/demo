import React from "react";
import { Link } from "react-router-dom";
import { getPosterUrl } from "../api/tmdb";

function MovieCard({ movie }) {
  const poster = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {poster ? (
  <img
    src={poster}
    alt={movie.title}
    onError={(e) => {
      
      e.target.style.display = "none";
    }}
  />
) : (
  <div className="movie-card-placeholder">No Image</div>
)}
    </Link>
  );
}

export default MovieCard;