import React, { useState } from "react";
import "../common/Notification.css";
import { useNavigate } from "react-router-dom";

function StudentNotification({ notifications }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleNotificationClick = (id, reason) => {
    if (reason) {
      setRejectionReason(reason); // Set the rejection reason
      setShowModal(true); // Show the modal
    } else {
      navigate("/status-bar/" + id);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setRejectionReason(""); // Clear the rejection reason
  };

  return (
    <div>
      {notifications.map((item) => (
        <div
          onClick={() =>
            handleNotificationClick(item.complaintId, item.reason)
          }
          key={item._id}
          className="notification-item"
        >
          <p>
            {item.message}
          </p>
          <p>Date: {new Date(item.date).toLocaleString()}</p>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="reject-modal">
            <h5>Rejection Reason</h5>
            <p>{rejectionReason}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentNotification;