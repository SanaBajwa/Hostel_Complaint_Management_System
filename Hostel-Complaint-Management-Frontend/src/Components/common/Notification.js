import { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import "./Notification.css";
import StudentNotification from "../Student_Dashboard/StudentNotification";
import RtNotification from "../RT_Dashboard/RTNotification";
import WardenNotification from "../Warden_Dashboard/WardenNotification";
import MunshiNotification from "../Munshi_Dashboard/MunshiNotification";
import EndUserNotification from "../EndUserDashboard/EndUserNotification";

function Notification({registrationNo}) {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const userRole = localStorage.getItem("userRole");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // ✅ Fetch notifications by registration number
  const fetchNotifications = async (regNo) => {
    if (!regNo) return;

    try {
      let id;
      if (userRole === "Student") {
        id = regNo;
      }
      else if (userRole === "EndUser") {
        id = userRole + "-" + localStorage.getItem("userRegNo");
      }
      else if(userRole === "RT"){
        id = userRole + "-" + localStorage.getItem("hostel");
      }
      else{
        id = userRole;
      }
      const response = await axios.get(
        `${backendUrl}/api/users/notifications/${id}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };
  useEffect(() => {
    if (registrationNo) {
      fetchNotifications(registrationNo);
    }

    // Poll for notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications(localStorage.getItem("registrationNo"));
    }, 30000);

    return () => clearInterval(interval);
  }, [registrationNo]);

  // ✅ Toggle notification dropdown
  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  // ✅ Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-container" ref={notificationRef}>
      <button onClick={toggleNotification} className="notification-btn">
        <FaBell size={24} />
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : userRole === "Student" ? (
            <StudentNotification notifications={notifications} />
          ) : userRole === "RT" ? (
            <RtNotification notifications={notifications} />
          ) : userRole === "Warden" ? (
            <WardenNotification notifications={notifications} />
          ) : userRole === "Munshi" ? (
            <MunshiNotification notifications={notifications} />
          ) : userRole === "EndUser" ? (
            <EndUserNotification notifications={notifications} />
          ): null}
        </div>
      )}
    </div>
  );
}

export default Notification;
