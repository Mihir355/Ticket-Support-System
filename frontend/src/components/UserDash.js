import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styling/userdash.css";

const UserDash = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="userdash-container">
      <div className="userdash-content">
        <h2 className="userdash-title">Welcome to the User Page</h2>
        <div className="userdash-buttons">
          <Link
            to={`/userpage/${userId}/create-ticket`}
            className="userdash-button"
          >
            Create Ticket
          </Link>
          <Link
            to={`/userpage/${userId}/view-tickets`}
            className="userdash-button"
          >
            View My Tickets
          </Link>
        </div>
        <button className="userdash-signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserDash;
