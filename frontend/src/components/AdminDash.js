import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styling/admindash.css";

const AdminDash = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // ✅ Token check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admindash-container">
      <div className="admindash-content">
        <h2 className="admindash-title">Admin Dashboard</h2>

        <div className="admindash-buttons">
          <Link
            to={`/employeepage/${userId}/view-tickets`}
            className="admindash-button"
          >
            View Tickets
          </Link>

          <button className="admindash-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
