import React from "react";
import "../common/Notification.css";
import { useNavigate } from "react-router-dom";

function WardenNotification({notifications}) {
  const navigate = useNavigate();
  const handleNotificationClick = (id) => {
    navigate("/complaints-lists", { state: { complaintId: id } });
  }
  return (
    <div>
      {notifications.map((item) => (
        <div onClick={()=>handleNotificationClick(item.complaintId)} key={item._id} className="notification-item">
          <p>
            {item.message}
          </p>
          <p>Date: {new Date(item.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default WardenNotification;
