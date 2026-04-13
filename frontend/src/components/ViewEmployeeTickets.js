import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styling/viewemployeetickets.css";

const ViewEmployeeTickets = () => {
  const { userId } = useParams();

  const [employeeTickets, setEmployeeTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState("created");

  const navigate = useNavigate();

  // ✅ Step 1: Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Step 2 + 3: API call with token + error handling
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return; // extra safety

        const response = await axios.get(
          `https://ticket-support-system-backend-elxz.onrender.com/api/employee/${userId}/tickets?page=${currentPage}&sort=${sortType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setEmployeeTickets(response.data.tickets);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Error fetching employee tickets", error);
        }
      }
    };

    fetchTickets();
  }, [userId, currentPage, sortType, navigate]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="fullscreen-background">
      <div className="employee-tickets-container">
        <h2 className="employee-tickets-title">Your Assigned Tickets</h2>

        {/* Sort Controls */}
        <div className="sort-controls">
          <button
            onClick={() => {
              setSortType("created");
              setCurrentPage(1);
            }}
            className={sortType === "created" ? "active" : ""}
          >
            Sort by Created
          </button>

          <button
            onClick={() => {
              setSortType("status");
              setCurrentPage(1);
            }}
            className={sortType === "status" ? "active" : ""}
          >
            Sort by Status
          </button>
        </div>

        {/* Ticket List */}
        <ul className="ticket-list">
          {employeeTickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item">
              <p>Description: {ticket.description}</p>
              <p>Status: {ticket.currentstatus}</p>
              <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>

              <Link
                to={`/employeepage/${userId}/view-tickets/${ticket._id}/details`}
                className="link"
              >
                <button className="view-details-button">View Details</button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <Link to={`/employeepage/${userId}`} className="go-back-button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ViewEmployeeTickets;
