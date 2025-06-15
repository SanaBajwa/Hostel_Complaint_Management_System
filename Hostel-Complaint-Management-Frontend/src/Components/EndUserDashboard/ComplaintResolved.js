import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComplaintResolved.css";
import { Link, useLocation } from "react-router-dom";
import filter from "../assets/images/filter.png";
import { useNavigate } from "react-router-dom";
import ResolvedImage from '../assets/images/submitted.png';

const EndUser_Complaint = () => {
  // Inside component
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Toggle filter dropdown
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [expandedComplaintId, setExpandedComplaintId] = useState(null); // For modal
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // UNCOMMENT THIS AFTER ADDING MODAL

  // const location = useLocation();

  // useEffect(() => {
  //   if (location.state && location.state.complaintId) {
  //     setExpandedComplaintId(location.state.complaintId);
  //     window.history.replaceState({}, document.title); // Clear the state to avoid re-rendering
  //   }
  // }, [location.state]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const regNo = localStorage.getItem("userRegNo");
        const response = await axios.get(
          `${backendUrl}/api/users/complaints-enduser/${regNo}`
        );
        setComplaints(response.data.complaints);
        setFilteredComplaints(response.data.complaints); // ✅ Set filteredComplaints too
      } catch (error) {
        console.error("Error fetching end-user complaints:", error.message);
      }
    };

    fetchComplaints();
  }, []);

  const handleDoneAndNavigate = async (id) => {
    await handleDoneClick(id);
    setShowPopup(true); // Show the popup instead of navigating
  };
  const handleBack = () => {
    setShowPopup(false);
    navigate('/endusers-listss'); // Navigate to ComplaintTypeMenu
  };
  const handleDoneClick = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/users/update-status/${id}`, {
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

  return (
    <div className="EndUser_complaint-container">
      {/* Filter Section */}
      {/* <div className="Munshi-filter-section">
        <button 
          className="Munshi-filter-btn" 
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          Filter
          <img src={filter} alt="Complaints Status" />
        </button>
        {showFilterMenu && (
          <div className="Munshi-filter-dropdown">
            <ul>
              <li onClick={() => handleSort('asc')}>Ascending Order</li>
              <li onClick={() => handleSort('desc')}>Descending Order</li>
              <li onClick={() => handleSort('time')}>By Time</li>
            </ul>
          </div>
        )}
      </div> */}

      {/* Complaint Table */}
      <div className="EndUser-complaint-table">
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
                    className="EndUser-check-btn"
                    onClick={() => handleDoneAndNavigate(complaint._id)}
                  >
                    Done
                  </button>
                  <button
                  onClick={() => setExpandedComplaintId(complaint._id)}
                    className="EndUser-view-btn"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default EndUser_Complaint;
