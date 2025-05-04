import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/profileupdate.css";

const ProfileUpdate = ({ userId, onProfileUpdated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://ticket-support-system-backend-elxz.onrender.com/api/user/${userId}`
        );
        const { firstName, lastName, email } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://ticket-support-system-backend-elxz.onrender.com/api/user/${userId}`,
        { firstName, lastName, email }
      );
      setSuccessMessage("Profile updated successfully!");
      if (onProfileUpdated) onProfileUpdated();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="profile-update-container">
      <form className="profile-form" onSubmit={handleUpdate}>
        <h2>Update Profile</h2>

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Update</button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ProfileUpdate;
