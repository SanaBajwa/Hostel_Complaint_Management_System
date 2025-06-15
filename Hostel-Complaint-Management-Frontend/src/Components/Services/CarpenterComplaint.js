import React from 'react';
import './CarpenterComplaint.css';

const CarpenterDetails = () => {
  return (
    <div className="service-details-container">
      <h2>Carpenter Service</h2>
      <p>
        Manage carpentry-related complaints. This includes issues such as furniture repairs, door fixing, or wooden fixture adjustments.
      </p>
      <ul>
        <li>Log carpentry complaints</li>
        <li>Assign carpenter tasks</li>
        <li>Track repair progress</li>
      </ul>
    </div>
  );
};

export default CarpenterDetails;
