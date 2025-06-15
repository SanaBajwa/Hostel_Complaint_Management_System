// Dashboard.js
import React from 'react';

import './MunshiDashboard.css'; // Import the CSS file for styling
import uet from '../assets/images/uet-logo.png'; // Logo path

const MunshiDashboard = () => {

  return (

      <div className="munshi-dashboard-main">
        <img src={uet} alt="UET Logo" className="uet-logo" />
      </div>

  );
};

export default MunshiDashboard;
