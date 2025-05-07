import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileUpdate from "./profileUpdate";
import "../styling/userdash.css";

const UserDash = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="userdash-container">
      {showProfileUpdate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProfileUpdate
              userId={userId}
              onProfileUpdated={() => setShowProfileUpdate(false)}
            />
            <button
              className="modal-close-button"
              onClick={() => setShowProfileUpdate(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="userdash-content">
        <h2 className="userdash-title">Welcome to the User Page</h2>
        <p className="userdash-description">
          Here you can create tickets, view your tickets, and update your
          profile details.
        </p>
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
          <button
            className="userdash-button"
            onClick={() => setShowProfileUpdate(true)}
          >
            Update Profile
          </button>
          <button className="userdash-button signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
