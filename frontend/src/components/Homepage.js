import React from "react";
import { Link } from "react-router-dom";
import "../styling/homepage.css";

const Homepage = () => {
  return (
    <div className="main-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to the Product Support Platform</h1>
        <p className="hero-description">
          Simplify your support needs with our platform. Whether you're a user
          or an employee, we provide the tools to help you connect, resolve
          issues, and get the support you need.
        </p>
        <img
          src="/images/support-platform-illustration.png"
          alt="Support Illustration"
          className="hero-image"
        />
      </header>
      <div className="box-container">
        <Link to="/signin" className="main-button">
          Sign In
        </Link>
        <Link to="/signup" className="main-button">
          Sign Up
        </Link>
      </div>
      <section className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Effortless Issue Tracking</h3>
            <p>
              Keep track of your support tickets and resolutions in one place.
            </p>
          </div>
          <div className="feature-item">
            <h3>Dedicated Employee Portal</h3>
            <p>
              Specialized tools for employees to manage and resolve issues
              efficiently.
            </p>
          </div>
          <div className="feature-item">
            <h3>Multi-Device Support</h3>
            <p>Access the platform seamlessly on desktop, tablet, or mobile.</p>
          </div>
        </div>
      </section>
      <footer className="homepage-footer">
        <p>© 2024 Product Support Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
