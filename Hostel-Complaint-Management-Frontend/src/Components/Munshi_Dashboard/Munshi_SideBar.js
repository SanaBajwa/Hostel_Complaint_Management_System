import React, { useEffect, useState } from "react";
import { FaClipboardList, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing
import logo from "../assets/images/uet-pic.png";
import "./Munshi_SideBar.css";
import comp from "../assets/images/complaint_icon.png";
import axios from "axios";
function Munshi_Sidebar() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [counts, setCounts] = useState({
    students: 0,
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/stats`
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error.message);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="Munshi-sidebar">
      <img src={logo} className="Munshi-UETLOGO" />
      <h3>Munshi's Dashboard</h3>
      {/* <div className="menu-item">
        <FaClipboardList style={{ marginRight: '8px' }} />
        <span>Complaint</span>
      </div> */}
      <ul>
        {/* Link to Complaints page */}
        <li className="warden-complaints">
          <Link to="/munshi-complaint">
            <span>Complaints</span>
            <img src={comp} alt="Complaints" className="munshi-complaint" />
          </Link>
        </li>
      </ul>
      <div className="Endstats">
        <div className="Endstat-box">
          <p>Total complaints</p>
          <h4>{counts.totalComplaints}</h4>
        </div>
        <div className="Endstat-box">
          <p>Resolved</p>
          <h4>{counts.resolvedComplaints}</h4>
        </div>
      </div>
    </div>
  );
}

export default Munshi_Sidebar;
