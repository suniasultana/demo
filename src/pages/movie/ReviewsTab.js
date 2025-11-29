import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb";

function ReviewsTab() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        setLoading(true);
        const data = await getMovieReviews(id);
        if (isMounted) {
          setReviews(data.results || []);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load reviews.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReviews();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="reviews-tab">
      <h2>Reviews</h2>
      {loading && <p>Loading reviews...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p>No reviews available.</p>
      )}

      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <p className="review-author">
              <strong>{review.author}</strong>
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsTab;