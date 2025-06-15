import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import './Sidebar.css';
import uet from '../assets/images/uet-pic.png';
import comp from '../assets/images/comp-removebg.png';
import compstatus from '../assets/images/comp-status1-removebg.png';

const Sidebar = () => {
  return (
    <div className="student-sidebar">
      <img src={uet} alt="UET Logo" className="student-sidebar-logo" />
      <h4 className='ST_header'>Student Dashboard</h4>
      <ul>
        {/* Link to Complaints page */}
        <li className="student-complaints">
          <Link to="/complaints">
            <span>Complaints</span><img src={comp} alt="Complaints" /> 
          </Link>
        </li>
        <hr />
        {/* Link to Complaint Status page */}
        <li className="student-complaint-status">
          <Link to="/complaint-status">
            <span>Complaints Status</span><img src={compstatus} alt="Complaints Status" /> 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
