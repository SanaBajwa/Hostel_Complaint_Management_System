import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Warden_Sidebar.css';
import uet from '../assets/images/uet-pic.png';
import comp from '../assets/images/comp-removebg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

const Warden_Sidebar = () => {
  return (
    <div className="warden-sidebar">
      <img src={uet} alt="UET Logo" className="warden-sidebar-logo" />
      <h4 className='Warden_header'>Warden Dashboard</h4>
      <ul>
        {/* Link to Complaints page */}
        <li className="warden-complaints">
          <Link to="/complaints-lists">
             <span>Complaints</span><img src={comp} alt="Complaints" className='warden_complaint' />
          </Link>
        </li>
        <hr />
        {/* Link to Complaint Status page */}
        <li className="warden-complaints">
          <Link to="/end-userlist">
             <span>End Users</span><FontAwesomeIcon className="warden-Graph-Icon" icon={faUsers} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Warden_Sidebar;

