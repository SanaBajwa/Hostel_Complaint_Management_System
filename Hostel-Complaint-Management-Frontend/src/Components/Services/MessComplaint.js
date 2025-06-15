import React from 'react';
import './MessComplaint.css';

const MessDetails = () => {
  return (
    <div className="service-details-container">
      <h2>Mess Service</h2>
      <p>
        Manage complaints related to the mess service. This includes issues such as food quality, hygiene, or meal scheduling.
      </p>
      <ul>
        <li>Log food-related complaints</li>
        <li>Monitor food quality</li>
        <li>Track complaint resolution</li>
      </ul>
    </div>
  );
};

export default MessDetails;
