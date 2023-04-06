import "./App.css";
import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import Login from "./views/register_and_login/Login";
import Register from "./views/register_and_login/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const isAuthenticated = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");

  if (accessToken && accessToken !== "null") {
    localStorage.setItem("accessToken", accessToken);
    return true;
  } else {
    return false;
  }
};

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route
          path="/"
          exact
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/blog/:id"
          element={
            isAuthenticated() ? <Blog /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/new"
          element={
            isAuthenticated() ? (
              <NewBlogPost />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
