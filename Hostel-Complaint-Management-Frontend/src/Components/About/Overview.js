import React from 'react';
import './Overview.css';

const Overview = () => {
  return (
    <div className="hostel-container">
      <div className="content-wrapper">
        <h3>Hello! This is Hostel Complaint Management System and I'm Your COMMUNITY DIGITAL ASSISTANT</h3>
        <h1>Hostel complaints at your fingertips</h1>
        <div className="button-container">
          <button className="play-button">
            <span>&#9654;</span> {/* Play Icon */}
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Overview;
