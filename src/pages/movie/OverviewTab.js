import React from "react";
import { useOutletContext } from "react-router-dom";

function OverviewTab() {
  const { movie } = useOutletContext();

  return (
    <div className="overview-tab">
      <h2>Overview</h2>
      <p>{movie.overview || "No overview available."}</p>

      {movie.genres && movie.genres.length > 0 && (
        <p className="movie-genres">
          <strong>Genres:</strong>{" "}
          {movie.genres.map((g) => g.name).join(", ")}
        </p>
      )}

      {movie.runtime && (
        <p>
          <strong>Runtime:</strong> {movie.runtime} min
        </p>
      )}
    </div>
  );
}

export default OverviewTab;