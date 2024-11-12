import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [specialization, setSpecialization] = useState("iphone");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLength = 8;

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.error("Password and Confirm Password do not match");
      window.alert("Password and Confirm Password do not match");
      return;
    }

    if (password.length < minPasswordLength) {
      console.error(
        `Password must be at least ${minPasswordLength} characters long`
      );
      window.alert(
        `Password must be at least ${minPasswordLength} characters long`
      );
      return;
    }

    if (!emailRegex.test(email)) {
      console.error("Invalid email format");
      window.alert("Invalid email format");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
      userType,
      specialization: userType === "employee" ? specialization : "",
    };
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post("/api/user/signup", user)
      .then((response) => {
        console.log("User registered successfully");
        window.alert("User registered successfully");
      })
      .catch((error) => {
        console.error("Error registering user", error);
        window.alert("Error registering user");
      });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <div className="form-container">
        <form className="signup-form">
          <div className="formGroup">
            <label className="signup-label">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="signup-input"
            />
          </div>
          <div className="formGroup">
            <label className="signup-label">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="signup-input"
            />
          </div>
          <div className="formGroup">
            <label className="signup-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signup-input"
            />
          </div>
          <div className="formGroup">
            <label className="signup-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="signup-input"
            />
          </div>
          <div className="formGroup">
            <label className="signup-label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="signup-input"
            />
          </div>
          <div className="formGroup">
            <label className="signup-label">User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="signup-select"
            >
              <option value="user">User</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {userType === "employee" && (
            <div className="formGroup">
              <label className="signup-label">Specialization:</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="signup-select"
              >
                <option value="iphone">iPhone</option>
                <option value="iwatch">iWatch</option>
                <option value="ipad">iPad</option>
              </select>
            </div>
          )}
          <div className="buttons">
            <button type="button" onClick={handleSignUp} className="button">
              Sign Up
            </button>
            <button type="button" onClick={handleGoBack} className="button">
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
