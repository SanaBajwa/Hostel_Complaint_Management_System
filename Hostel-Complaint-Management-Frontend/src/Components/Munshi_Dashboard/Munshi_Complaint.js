import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Munshi_Complaint.css";
import { Link, useNavigate } from "react-router-dom";
import filter from "../assets/images/filter.png";
import { useLocation } from "react-router-dom";
import ResolvedImage from '../assets/images/submitted.png';

const Munshi_Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Toggle filter dropdown
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [expandedComplaintId, setExpandedComplaintId] = useState(null); // For modal
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/complaints-munshi`
        );
        const messComplaints = response.data.complaints.filter(
          (complaint) => complaint.title === "Mess"
        );
        setComplaints(messComplaints);
        setFilteredComplaints(messComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
      }
    };

    fetchComplaints();
  }, []);

  // Function to handle sorting
  const handleSort = (order) => {
    let sortedComplaints = [...complaints];

    if (order === "asc") {
      sortedComplaints.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (ascending)
    } else if (order === "desc") {
      sortedComplaints.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title (descending)
    } else if (order === "time") {
      sortedComplaints.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (most recent first)
    }

    setFilteredComplaints(sortedComplaints);
    setShowFilterMenu(false); // Close dropdown after selecting
  };

  const handleDoneAndNavigate = async (id) => {
    await handleDoneClick(id);
    setShowPopup(true); // Show the popup instead of navigating
  };

  const handleBack = () => {
    setShowPopup(false);
    navigate('/munshi-complaint'); // Navigate to ComplaintTypeMenu
  };

  const handleDoneClick = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/update-status/${id}`, {
        status: "Done",
      });

      // Update local state
      const updatedList = complaints.map((comp) =>
        comp._id === id ? { ...comp, status: "Done" } : comp
      );
      setComplaints(updatedList);
      setFilteredComplaints(updatedList);
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="Munshi-complaint-container">
      {/* Complaint Table */}
      <div className="Munshi-complaint-table">
        <table>
          <thead>
            <tr>
              <th>Complaint List</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDoneAndNavigate(complaint._id)}
                    className="Munshi-check-btn"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => setExpandedComplaintId(complaint._id)}
                    className="Munshi-view-btn"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup on Done */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src={ResolvedImage} alt="Submitted" className="popup-image" />
            <h3>Resolved</h3>
            <button onClick={handleBack} className="back-button">
              Back
            </button>
          </div>
        </div>
      )}

      {/* View Complaint Modal */}
      {expandedComplaintId && (
        <div className="munshi-modal">
          <div className="munshi-modal-content">
            <button
              className="munshi-close-btn"
              onClick={() => setExpandedComplaintId(null)}
            >
              X
            </button>
            {filteredComplaints
              .filter((complaint) => complaint._id === expandedComplaintId)
              .map((complaint) => (
                <div key={complaint._id}>
                  <h2>{complaint.title}</h2>
                  <p><strong>Registration No:</strong> {complaint.registrationNo}</p>
                  <p><strong>Room No:</strong> {complaint.roomNo}</p>
                  <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {complaint.description}</p>
                  <p><strong>Hostel:</strong> {complaint.hostel}</p>
                  <button
                    className="munshi-back-btn"
                    onClick={() => setExpandedComplaintId(null)}
                  >
                    Back to List
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Munshi_Complaint;
