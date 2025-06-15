import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './SA_SideBar.css';
import uet from '../assets/images/uet-pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faHotel } from '@fortawesome/free-solid-svg-icons'; // Correct import
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';

const SA_SideBar = () => {
  return (
    <div className="sa_sidebar">
      <img src={uet} alt="UET Logo" className="sa_sidebar-logo" />
      <hr />
      <h4 className='sa_header'>Super Admin Dashboard</h4>
      <ul>
        {/* Link to Complaints page */}
        <li className="sa-complaint-status">
          <Link to="/sa-hostels-list">
          <span>Hostels</span><FontAwesomeIcon className="Hostel-Icon" icon={faHotel} /> 
          </Link>
        </li>
        <hr />
        <li className="sa-complaint-status">
          <Link to="/sa-users-list">
          <span>Users</span><FontAwesomeIcon className="Warden-Icon" icon={faPerson} /> 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SA_SideBar;
