import React from "react";
import { Link } from "react-router-dom";
import "../styling/homepage.css";
const Homepage = () => {
  return (
    <div className="main-container">
      <h2 className="main-title">Welcome to the Ticket Support System</h2>
      <div className="box-container">
        <Link to="/signin" className="main-button">
          Sign In
        </Link>
        <Link to="/signup" className="main-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
