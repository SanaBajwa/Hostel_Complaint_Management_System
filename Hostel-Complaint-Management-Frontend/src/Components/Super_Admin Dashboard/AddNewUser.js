import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewUser.css";
import { toast } from "react-toastify";

// Sample Hostels List (Replace with actual data)
const hostels = ["Hostel A", "Hostel B", "Hostel C", "Hostel D"];

const AddNewUser = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("");

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", { userName, role, selectedHostel });
    toast("User Added Successfully!", { type: "success" });
    navigate(-1); // Go back to the previous page after submission
  };

  return (
    <div className="add-user-page">
      <h2>Add New User</h2>
      <form onSubmit={handleFormSubmit} className="user-form">
        <div className="form-field">
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Hostel:</label>
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            required
          >
            <option value="">Select Hostel</option>
            {hostels.map((hostel, index) => (
              <option key={index} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>
        </div>
        <button className="add-user" type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddNewUser;
