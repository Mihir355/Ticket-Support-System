import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/employeeticketdetails.css";

const EmployeeTicketDetails = () => {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const api = axios.create({
          baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
        });

        const response = await api.get(`/api/tickets/${ticketId}/details`);
        const fetchedTicketDetails = response.data;

        // Only update status if the current status is not "closed"
        if (
          fetchedTicketDetails.feedbacks.length > 0 &&
          fetchedTicketDetails.currentstatus !== "closed"
        ) {
          fetchedTicketDetails.currentstatus = "in progress";

          api
            .patch(`/api/tickets/${ticketId}/update-status`, {
              newStatus: "in progress",
            })
            .then((response) => {
              console.log("Ticket status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error updating ticket status", error);
            });
        }

        setTicketDetails(fetchedTicketDetails);
      } catch (error) {
        console.error("Error fetching ticket details", error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  const handleAddFeedback = () => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post(`/api/tickets/${ticketId}/add-feedback`, {
        content: feedbackContent,
      })
      .then((response) => {
        const updatedTicketDetails = response.data;
        setTicketDetails(updatedTicketDetails);
        setFeedbackContent("");

        if (
          updatedTicketDetails.feedbacks.length > 0 &&
          updatedTicketDetails.currentstatus !== "closed"
        ) {
          setTicketDetails((prevTicketDetails) => ({
            ...prevTicketDetails,
            currentstatus: "in progress",
          }));

          api
            .patch(`/api/tickets/${ticketId}/update-status`, {
              newStatus: "in progress",
            })
            .then((response) => {
              console.log("Ticket status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error updating ticket status", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error adding feedback to ticket", error);
      });
  };

  const handleCloseTicket = () => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    if (ticketDetails.currentstatus !== "closed") {
      api
        .patch(`/api/tickets/${ticketId}/update-status`, {
          newStatus: "closed",
        })
        .then((response) => {
          setTicketDetails((prevTicketDetails) => ({
            ...prevTicketDetails,
            currentstatus: "closed",
          }));
          console.log("Ticket closed successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error closing ticket", error);
        });
    }
  };

  const handleGoBack = () => {
    navigate(`/employeepage/${ticketDetails.assignedTo}/view-tickets`);
  };

  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-container">
      <div className="employee-ticket-wrapper">
        <button onClick={handleGoBack} className="employee-back-button">
          Go Back
        </button>
        <h1 className="employee-ticket-heading">Ticket Details</h1>
        <p className="employee-ticket-detail">
          <b>Ticket Id:</b> {ticketDetails._id}
        </p>
        <p className="employee-ticket-detail">
          <b>Description:</b> {ticketDetails.description}
        </p>
        <p className="employee-ticket-detail">
          <b>Status:</b> {ticketDetails.currentstatus}
        </p>
        <p className="employee-ticket-detail">
          <b>Created At:</b>{" "}
          {new Date(ticketDetails.createdAt).toLocaleString()}
        </p>
        <p className="employee-ticket-detail">
          <b>Customer Name:</b> {ticketDetails.customerName}
        </p>
        <p className="employee-ticket-detail">
          <b>Customer Email:</b> {ticketDetails.customerEmail}
        </p>
        <button
          onClick={handleCloseTicket}
          className="employee-close-ticket-button"
        >
          Close Ticket
        </button>

        <div className="employee-notes-section">
          <p className="employee-notes-heading">Notes:</p>
          <ul className="employee-notes-list">
            {ticketDetails.notes.map((note, index) => (
              <li key={index} className="employee-note-item">
                {note.content}
              </li>
            ))}
          </ul>
        </div>

        {ticketDetails.feedbacks?.length > 0 && (
          <div className="employee-feedbacks-section">
            <p className="employee-feedbacks-heading">Responses:</p>
            <ul className="employee-feedbacks-list">
              {ticketDetails.feedbacks.map((feedback) => (
                <li key={feedback._id} className="employee-feedback-item">
                  {feedback.content} -{" "}
                  {new Date(feedback.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="employee-add-feedback-section">
          <textarea
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            placeholder="Add a response..."
            className="employee-feedback-textarea"
          />
          <button
            onClick={handleAddFeedback}
            className="employee-add-feedback-button"
          >
            Add Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTicketDetails;
