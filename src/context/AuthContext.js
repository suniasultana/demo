import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

/**
 * AuthContext
 *
 * Provides:
 * - user: object | null
 * - token: string | null
 * - loading: boolean (initializing from localStorage)
 * - login(data) -> sets user & token (data should be { user, token })
 * - logout() -> clears storage and state
 *
 * Uses localStorage keys: movieUser, movieToken
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("movieUser") || "null");
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("movieToken"));
  const [loading, setLoading] = useState(false);

  // helper to persist
  function persist(userObj, jwt) {
    if (userObj && jwt) {
      localStorage.setItem("movieUser", JSON.stringify(userObj));
      localStorage.setItem("movieToken", jwt);
      setUser(userObj);
      setToken(jwt);
    } else {
      localStorage.removeItem("movieUser");
      localStorage.removeItem("movieToken");
      setUser(null);
      setToken(null);
    }
  }

  // login(data) expects { user, token }
  const login = (data) => {
    if (!data) return;
    persist(data.user, data.token);
  };

  const logout = () => {
    persist(null, null);
    // optional redirect after logout:
    navigate("/");
  };

  // keep state in sync with other tabs
  useEffect(() => {
    function onStorage() {
      try {
        setUser(JSON.parse(localStorage.getItem("movieUser") || "null"));
      } catch {
        setUser(null);
      }
      setToken(localStorage.getItem("movieToken"));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = { user, token, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// custom hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

/**
 * ProtectedRoute usage:
 * <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
 */
export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    // not logged in; redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
}