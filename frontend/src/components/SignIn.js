import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/signin.css";

const AlertModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSignIn = () => {
    const user = {
      email,
      password,
      userType,
    };
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post("/api/user/signin", user)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);

        if (userType === "user") {
          navigate(`/userpage/${user._id}`);
        } else if (userType === "employee") {
          navigate(`/employeepage/${user._id}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setAlertMessage("User not found");
        } else if (error.response && error.response.status === 401) {
          setAlertMessage("Incorrect credentials");
        } else {
          setAlertMessage("An unexpected error occurred. Please try again.");
          console.error("Error signing in", error);
        }
      });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      <div className="signin-form-container">
        <form className="signin-form">
          <div className="signin-formGroup">
            <label className="signin-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signin-input"
            />
          </div>
          <div className="signin-formGroup">
            <label className="signin-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="signin-input"
            />
          </div>
          <div className="signin-formGroup">
            <label className="signin-label">User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="signin-select"
            >
              <option value="user">User</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleSignIn} className="button">
              Login
            </button>
            <button type="button" onClick={handleGoBack} className="button">
              Go Back
            </button>
          </div>
        </form>
      </div>
      <AlertModal message={alertMessage} onClose={() => setAlertMessage("")} />
    </div>
  );
};

export default SignIn;
