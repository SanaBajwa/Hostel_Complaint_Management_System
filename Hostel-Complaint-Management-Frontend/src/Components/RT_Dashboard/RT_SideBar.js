import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './RT_SideBar.css';
import uet from '../assets/images/uet-pic.png';
import comp from '../assets/images/comp-removebg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'; // Correct import
import HostelLogo from '../assets/images/HostelLogo1.png'
const RT_Sidebar = () => {
  return (
    <div className="RT-sidebar">
      <img src={uet} alt="UET Logo" className="sidebar-logo" />
      <hr />
      <h4 className='RT_header'>RT Dashboard</h4>
      <ul>
        {/* Link to Complaints page */}
        <li className="RT-complaints">
          <Link to="/complaint-list">
            <span>Complaints</span><img src={comp} alt="Complaints" />
          </Link>
        </li>
        <hr />
        {/* Link to Complaint Status page */}
        <li className="RT-complaint-status">
          <Link to="/graphical-view">
            <span>Graphical View</span><FontAwesomeIcon className="RT-Graph-Icon" icon={faChartSimple} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RT_Sidebar;
