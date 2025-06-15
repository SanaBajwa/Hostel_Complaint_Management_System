import React from 'react';
import './OtherComplaint';

const OthersDetails = () => {
  return (
    <div className="service-details-container">
      <h2>Other Services</h2>
      <p>
        Manage other complaints that don’t fit into specific categories. This includes miscellaneous issues requiring attention.
      </p>
      <ul>
        <li>Log miscellaneous complaints</li>
        <li>Route to appropriate personnel</li>
        <li>Monitor resolution status</li>
      </ul>
    </div>
  );
};

export default OthersDetails;
