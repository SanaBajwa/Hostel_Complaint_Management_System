import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import {  FaUserFriends } from 'react-icons/fa';
import logo from "../assets/images/uet-pic.png"
import './EndUser_Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function EndUserSidebar() {
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
    <div className="Endsidebar">
      <img src={logo} className='EndUETLOGO'/>
      <h3>EndUser's Dashboard</h3>
      {/* <div className="menu-item">
        <FaClipboardList style={{ marginRight: '8px' }} />
        <span>Complaint</span>
      </div> */}

      <div className="Endmenu-item">
        {/* <span>End Users</span> */}

        <ul>
        <li className="endusers-listss">
          <Link to="/endusers-listss">
            <span>Complaints</span><FontAwesomeIcon className="EndUser-Icon" icon={faPerson} />
          </Link>
        </li>
        </ul>

      </div>
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

export default EndUserSidebar