import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './ComplaintTypeMenu.css'; // Importing the updated CSS
import { Container } from 'react-bootstrap';

const ComplaintTypeMenu = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the complaint form with selected type
  const handleComplaintClick = (type) => {
    navigate('/complaint-form', { state: { complaintType: type } });
  };

  return (
    <section className="complaint-type-wrapper">
      <div className="complaint-type-menu">
        <h2>Select the Type of Complaint</h2>
        <ul>
          <li onClick={() => handleComplaintClick('Electricity')}>
            Electricity
          </li>
          <li onClick={() => handleComplaintClick('Plumber')}>
            Plumber
          </li>
          <li onClick={() => handleComplaintClick('Carpenter')}>
            Carpenter
          </li>
          <li onClick={() => handleComplaintClick('Mess')}>
            Mess
          </li>
          <li onClick={() => handleComplaintClick('Others')}>
            Others
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ComplaintTypeMenu;
