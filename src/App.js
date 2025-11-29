import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import OverviewTab from "./pages/movie/OverviewTab";
import CastTab from "./pages/movie/CastTab";
import ReviewsTab from "./pages/movie/ReviewsTab";
import LoginPage from "./pages/LoginPage";  
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetails from "./pages/movie/MovieDetails";


function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          {/* Home - Trending */}
          <Route path="/" element={<HomePage />} />

          {/* Search page */}
          <Route path="/search" element={<SearchPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Movie details with nested routes */}
          <Route path="/movie/:id" element={<MoviePage />}>
            <Route index element={<OverviewTab />} />
            <Route path="overview" element={<OverviewTab />} />
            <Route path="cast" element={<CastTab />} />
            <Route path="reviews" element={<ReviewsTab />} />
            <Route path="/movie/:id/trailer" element={<MovieDetails/>}/>
            

            
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;