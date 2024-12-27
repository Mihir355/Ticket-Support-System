import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/signin.css";

const CustomDropdown = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className="dropdown-button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected
          ? options.find((opt) => opt.value === selected).label
          : "Select an option"}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
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
    const user = { email, password, userType };
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

  const handleGoBack = () => navigate("/");

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
            <CustomDropdown
              options={[
                { value: "user", label: "User" },
                { value: "employee", label: "Employee" },
              ]}
              selected={userType}
              onChange={setUserType}
            />
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
    </div>
  );
};

export default SignIn;
