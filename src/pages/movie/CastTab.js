import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { getMovieCredits } from "../../api/tmdb";

function CastTab() {
  const { movie } = useOutletContext();
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCast() {
      try {
        setLoading(true);
        const data = await getMovieCredits(id);
        if (isMounted) {
          setCast(data.cast || []);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load cast.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCast();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="cast-tab">
      <h2>Cast</h2>
      {loading && <p>Loading cast...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && cast.length === 0 && (
        <p>No cast information available.</p>
      )}

      <ul className="cast-list">
        {cast.slice(0, 20).map((person) => (
          <li key={person.cast_id || person.credit_id}>
            <strong>{person.name}</strong> as {person.character || "-"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CastTab;
