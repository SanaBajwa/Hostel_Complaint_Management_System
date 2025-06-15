// Dashboard.js
import React from 'react';

import './RtDashboard.css'; // Import the CSS file for styling
import uet from '../assets/images/uet-logo.png'; // Logo path

const Dashboard = () => {

  return (

      <div className="dashboard-main">
        <img src={uet} alt="UET Logo" className="uet-logo" />
      </div>

  );
};

export default Dashboard;
