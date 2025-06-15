import React from 'react';
import './ElectricalComplaint.css';

const ElectricityDetails = () => {
  return (
    <div className="service-details-container">
      <h2>Electricity Service</h2>
      <p>
        Manage electricity-related complaints. This includes issues such as power outages, wiring problems, or device malfunctions.
      </p>
      <ul>
        <li>Complaint logging</li>
        <li>Assign electrician</li>
        <li>Track resolution status</li>
      </ul>
    </div>
  );
};

export default ElectricityDetails;
