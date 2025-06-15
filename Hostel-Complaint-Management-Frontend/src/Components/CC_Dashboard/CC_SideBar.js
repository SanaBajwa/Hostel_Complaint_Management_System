import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './CC_SideBar.css';
import uet from '../assets/images/uet-pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faHotel } from '@fortawesome/free-solid-svg-icons'; // Correct import
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';

const RT_Sidebar = () => {
  return (
    <div className="cc_sidebar">
      <img src={uet} alt="UET Logo" className="cc_sidebar-logo" />
      <hr />
      <h4 className='CC_header'>CC Dashboard</h4>
      <ul>
        {/* Link to Complaints page */}
        <li className="cc-complaint-status">
          <Link to="/hostels-list">
          <span>Hostels</span><FontAwesomeIcon className="Hostel-Icon" icon={faHotel} /> 
          </Link>
        </li>
        <hr />
        {/* Link to Complaint Status page */}
        <li className="cc-complaint-status">
          <Link to="/rts-list">
          <span>RT's</span><FontAwesomeIcon className="RT-Icon" icon={faPerson} /> 
          </Link>
        </li>
        <hr />
        {/* Link to Complaint Status page */}
        <li className="cc-complaint-status">
          <Link to="/wardens-list">
          <span>Wardens</span><FontAwesomeIcon className="Warden-Icon" icon={faPerson} /> 
          </Link>
        </li>
        <hr />
        {/* Link to Complaint Status page */}
        <li className="cc-complaint-status">
          <Link to="/cc-graph-view">
          <span>Graphical View</span><FontAwesomeIcon className="Graph-Icon" icon={faChartSimple} /> 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RT_Sidebar;
