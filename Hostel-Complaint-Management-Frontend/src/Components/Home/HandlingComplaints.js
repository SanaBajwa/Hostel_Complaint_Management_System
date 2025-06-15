import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HandlingComplaints.css"
import HandleComplaint from "../assets/images/complaint3.jpg"
const HomeBannerSection = () => {
  return (
    <section className="HandlingComplaintsWrapper">
      <Container>
        <Row>
          <Col lg={6} className="d-flex align-item-center flex-column justify-content-center">
           <img src={HandleComplaint}/>
          </Col>
          <Col lg={6}>
          <div className="bannerContent ">
              <div>
                <div>
                  <div className="para">
                    <p>"Welcome to the Hostel Complaint Management System. Quickly report and track hostel issues to ensure a better living experience. Log in to manage and resolve your complaints efficiently."</p>
                  </div>
                
                </div>
              </div>
            </div>
          </Col>
        </Row>zzzz
      </Container>
    </section>
  );
};

export default HomeBannerSection;
