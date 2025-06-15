import React, { useState } from 'react';
import './ComplaintManagement.css'; // Custom styles for the layout
import { Row, Col } from 'react-bootstrap'; // Ensure Row and Col are imported

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([
    {
      title: "Damaged Product",
      description: "I kindly request a review of the complaint and a replacement.",
    },
    {
      title: "Incorrect Payment",
      description: "During the payment for order no. 678910, I encountered an issue...",
    },
    {
      title: "plumber issue",
      description: "During the payment for order no. 678910, I encountered an issue...",
    },
    {
      title: "carpenter issue",
      description: "During the payment for order no. 678910, I encountered an issue...",
    },
    {
      title: "electrical issue",
      description: "During the payment for order no. 678910, I encountered an issue...",
    },
    {
      title: "mess issue",
      description: "During the payment for order no. 678910, I encountered an issue...",
    },
  ]);

  return (
    <div className='Complaint_manage'>
    <h1><b>How Complaints Are Managed?</b></h1>
    <section className="complaint-management-container">
      <Row className="complaint-management-row">
        {/* Left Column */}
        <Col lg={6}>
          <div className="content-container">
            <h1 className="title">
              <b>Manage complaint submissions using a convenient panel for customer communication:</b>
            </h1>
            <ul className="feature-list">
              <li>Integration with email</li>
              <li>Communication history for individual submissions</li>
              <li>Monitoring of response times</li>
              <li>Response templates</li>
              <li>Submission types</li>
              <li>Dynamic fields</li>
              <li>Pre-configured statuses</li>
              <li>Wewnętrzne notatki</li> {/* Internal notes in Polish */}
            </ul>
          </div>
        </Col>

        {/* Right Column */}
        <Col lg={6}>
        <div className="complaints-container">
      {complaints.map((complaint, index) => (
        <div key={index} className="complaint-card">
          <div className="complaint-circle"></div>
          <div className="complaint-text">
            <h2>{complaint.title}</h2>
            <p>{complaint.description}</p>
          </div>
        </div>
      ))}
      {/* <div className="progress-bar">
        <span className="progress-dot active"></span>
        <span className="progress-dot"></span>
        <span className="progress-dot"></span>
      </div> */}
    </div>
        </Col>
      </Row>
      
    </section>
    </div>
  );
};

export default ComplaintManagement;
