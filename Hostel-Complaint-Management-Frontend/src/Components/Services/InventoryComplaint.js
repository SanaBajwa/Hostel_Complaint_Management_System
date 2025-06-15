import React from 'react';
import './InventoryComplaint.css';

const InventoryDetails = () => {
  return (
    <div className="service-details-container">
      <h2>Inventory Service</h2>
      <p>
        Manage inventory-related complaints. This includes issues such as missing items, damaged goods, or insufficient stock.
      </p>
      <ul>
        <li>Log inventory issues</li>
        <li>Track missing or damaged items</li>
        <li>Manage inventory requests</li>
      </ul>
    </div>
  );
};

export default InventoryDetails;
