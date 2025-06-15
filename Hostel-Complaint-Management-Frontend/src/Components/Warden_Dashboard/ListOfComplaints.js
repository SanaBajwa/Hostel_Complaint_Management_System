import React, { useState, useEffect } from "react";
import "./ListOfComplaints.css";
import axios from "axios";
import { toast } from "react-toastify";

const ListOfComplaint = () => {
  const [wardenComplaints, setWardenComplaints] = useState([]);
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const endUserMapping = {
    "Electricity": "Electrician",
    "Plumber": "Plumber",
    "Carpenter": "Carpenter",
  };

  useEffect(() => {
    const fetchWardenComplaints = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/complaints`);
        console.log("Sample complaint:", response.data.complaints[0]);

        const filteredComplaints = response.data.complaints.filter(
          (complaint) => complaint.status === "Warden"
        );
        setWardenComplaints(filteredComplaints);
      } catch (error) {
        console.error("Error fetching complaints for Warden:", error.message);
      }
    };

    fetchWardenComplaints();
  }, []);

  const handleSelectEndUser = async (complaintId, type) => {
    const endUserRole = endUserMapping[type] || "Other";

    try {
      await axios.put(`${backendUrl}/api/users/assign/${complaintId}`, {
        assignedTo: endUserRole,
        status: "End User",
      });
      toast(`Complaint sent to ${endUserRole}`);

      setWardenComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, assignedTo: endUserRole, status: "End User" }
            : complaint
        )
      );
    } catch (error) {
      console.error("Error updating complaint:", error.message);
    }
  };

  const handleCloseModal = () => {
    setExpandedComplaintId(null);
  };

  return (
    <div className="warden_complaint_container">
      <div className="warden_complaint_table">
        <table className="warden_table">
          <thead>
            <tr>
              <th>Complaint List</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wardenComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{complaint.priority}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="assign-enduser"
                    onClick={() => handleSelectEndUser(complaint._id, complaint.title)}
                  >
                    Assign to End User
                  </button>
                  <button
                    className="view-complaint"
                    onClick={() => setExpandedComplaintId(complaint._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Complaint Modal */}
      {expandedComplaintId && (
        <div className="warden-modal">
          <div className="warden-modal-content">
            <button className="warden-close-btn" onClick={handleCloseModal}>
              X
            </button>
            <div className="warden-complaint-detail">
              {wardenComplaints
                .filter((complaint) => complaint._id === expandedComplaintId)
                .map((complaint) => (
                  <div key={complaint._id}>
                    <h2>{complaint.title}</h2>
                    <p><strong>Registration No:</strong> {complaint.registrationNo}</p>
                    <p><strong>Room No:</strong> {complaint.roomNo}</p>
                    <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                    <p><strong>Description:</strong> {complaint.description}</p>
                    <p><strong>Hostel:</strong> {complaint.hostel}</p>
                    <button className="warden-back-btn" onClick={handleCloseModal}>
                      Back to List
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfComplaint;
