import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="back-home-link">
        Go back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
