import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import freeImg from '../assets/images/free.jpg';
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleSignIn = () => {
    setIsLoading(true); // Show progress bar
    setTimeout(() => {
      setIsLoading(false); // Hide progress bar
      navigate('/login'); // Navigate to login page
    }, 2000); // 2 seconds progress animation
  };

  return (
    <section className="FreeAccountWrapper">
      {isLoading && <div className="progress-bar"></div>} {/* Progress bar */}
      <Container>
        <div className="FreeAccount">
          <Row>
            <Col lg={6}>
              <h2>Sign In To Submit Complaint</h2>
              <p>
                Want to submit complaint ? here you go<br/>
                sign in to submit complaint
              </p>
              <div className="Join-Now">
                <button onClick={handleSignIn}>
                  Sign In
                  <svg
                    width="27"
                    height="16"
                    viewBox="0 0 27 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.8286 7.76953H1"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.0586 1.0006L25.8278 7.76983L19.0586 14.5391"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="free-image mx-auto">
                <img src={freeImg} alt="Free Account" />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CreateAccount;
