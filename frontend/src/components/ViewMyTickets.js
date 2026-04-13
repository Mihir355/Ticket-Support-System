import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import "../styling/viewmytickets.css";

const UserTickets = () => {
  const { userId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // ✅ Check token first (runs once on mount)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchTickets = async (page) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://ticket-support-system-backend-elxz.onrender.com/api/tickets/user/${userId}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTickets(response.data.tickets);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      // ✅ Handle invalid/expired token separately
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error fetching user's tickets", error);
      }
    }
  };

  // ✅ Only call API if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTickets(currentPage);
    }
  }, [userId, currentPage]);

  const handleViewDetails = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchTickets(newPage);
    }
  };

  return (
    <div className="fullscreen-background">
      <div className="user-tickets-container">
        <h2 className="user-tickets-title">User's Tickets</h2>

        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item">
              <h3>Product Type: {ticket.productType}</h3>
              <p>Status: {ticket.currentstatus}</p>
              <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(ticket._id)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>

        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {selectedTicketId && (
          <Navigate
            to={`/userpage/${userId}/view-tickets/${selectedTicketId}/details`}
          />
        )}

        <Link to={`/userpage/${userId}`} className="go-back-button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default UserTickets;
