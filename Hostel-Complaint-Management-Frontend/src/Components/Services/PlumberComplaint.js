import React from 'react';
import './PlumberComplaint.css';

const PlumberDetails = () => {
  return (
    <div className="service-details-container">
      <h2>Plumber Service</h2>
      <p>
        Manage plumbing-related complaints. This includes issues such as leaky pipes, clogged drains, or faulty faucets.
      </p>
      <ul>
        <li>Log plumbing complaints</li>
        <li>Assign plumber tasks</li>
        <li>Track issue resolution</li>
      </ul>
    </div>
  );
};

export default PlumberDetails;
