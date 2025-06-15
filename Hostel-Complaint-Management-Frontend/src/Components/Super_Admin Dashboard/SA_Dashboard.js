// Dashboard.js
import React from 'react';

import './SA_Dashboard.css'; // Import the CSS file for styling
import uet from '../assets/images/uet-logo.png'; // Logo path

const Dashboard = () => {

  return (

      <div className="SA_dashboard-main">
        <img src={uet} alt="UET Logo" className="SA_uet-logo" />
      </div>

  );
};

export default Dashboard;
