import React, { useState } from 'react';
import './Services.css';
import ElectricityDetails from './services/ElectricityDetails';
import MessDetails from './services/MessDetails';
import CarpenterDetails from './services/CarpenterDetails';
import PlumberDetails from './services/PlumberDetails';
import InventoryDetails from './services/InventoryDetails';
import OthersDetails from './services/OthersDetails';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(null);

  const renderDetails = () => {
    switch (activeService) {
      case 'Electricity':
        return <ElectricityDetails />;
      case 'Mess':
        return <MessDetails />;
      case 'Carpenter':
        return <CarpenterDetails />;
      case 'Plumber':
        return <PlumberDetails />;
      case 'Inventory':
        return <InventoryDetails />;
      case 'Others':
        return <OthersDetails />;
      default:
        return <p>Select a service to see details.</p>;
    }
  };

  return (
    <div className="services-page">
      <h1>Hostel Complaint Management Services</h1>
      <div className="services-list">
        {['Electricity', 'Mess', 'Carpenter', 'Plumber', 'Inventory', 'Others'].map((service) => (
          <div
            key={service}
            className={`service-card ${activeService === service ? 'active' : ''}`}
            onClick={() => setActiveService(service)}
          >
            <h3>{service}</h3>
            <p>Click to manage {service.toLowerCase()} complaints.</p>
          </div>
        ))}
      </div>
      <div className="service-details">{renderDetails()}</div>
    </div>
  );
};

export default ServicesPage;
