import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchText(q);
  }, [location.search]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = searchText.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header style={headerStyle}>
      <div style={leftStyle}>
        <Link to="/" style={logoStyle}>
          🎬 Movie Explorer
        </Link>
      </div>

      <div style={centerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            placeholder="Search movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={inputStyle}
            aria-label="Search movies"
          />
          <button type="submit" style={searchBtnStyle}>Search</button>
        </form>
      </div>

      <div style={rightStyle}>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hi, {user.name || user.email}</span>
            <button onClick={logout} style={logoutBtnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={{ ...linkStyle, marginLeft: 12 }}>Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}

/* styles (same as earlier sample) */
const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 20px",
  color: "#fff",
};
const leftStyle = { display: "flex", alignItems: "center" };
const centerStyle = { flex: 1, display: "flex", justifyContent: "center" };
const rightStyle = { display: "flex", alignItems: "center" };
const logoStyle = { fontSize: 18, color: "inherit", textDecoration: "none", fontWeight: 600 };
const formStyle = { display: "flex", width: "100%", maxWidth: 700 };
const inputStyle = {
  flex: 1, padding: "10px 12px", borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "#fff"
};
const searchBtnStyle = { marginLeft: 8, padding: "10px 14px", borderRadius: 6, border: "none", background: "#2b8cff", color: "#fff" };
const linkStyle = { color: "#fff", textDecoration: "none", fontWeight: 500 };
const logoutBtnStyle = { padding: "8px 12px", borderRadius: 6, border: "none", background: "#ff5c5c", color: "#fff" };