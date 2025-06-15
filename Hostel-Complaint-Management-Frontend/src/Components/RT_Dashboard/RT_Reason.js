import React from "react";
import { useLocation } from "react-router-dom";
import "../RT_Dashboard/RT_Reason.css";

function RT_Reason() {
  const location = useLocation();
  const complaintId = location.state?.complaintId || "No ID provided";

  return (
    <div className="RT_Reject_Reason">
      <h1>Reason for Rejection</h1>
      <p>Complaint ID: {complaintId}</p> {/* Display the complaint ID */}
      <input type="text" className="Reason" placeholder="Enter reason..." /><br />
      <button type="button" className="Reason_Button">Done</button>
    </div>
  );
}

export default RT_Reason;
