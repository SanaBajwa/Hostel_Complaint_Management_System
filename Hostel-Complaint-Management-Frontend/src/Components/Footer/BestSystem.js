import React, { useEffect, useState } from "react";
import "./BestSystem.css";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup"; // Make sure to import CountUp
import axios from "axios";

const FooterSection = () => {
  const [counts, setCounts] = useState({ students: 0, totalComplaints: 0, resolvedComplaints: 0, pendingComplaints: 0 });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/stats`);
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error.message);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="FooterSectionWrapper">
      <Container className="h-100">
        <Row className="achievement-wrapper align-items-center">
          <Col lg={5}>
            <div className="achievement-icons position-relative">
              <div className="vector-box-wrapper small-box position2">
                <div className="vector-box-content text-center">
                  <div>
                    <h2>
                      <CountUp end={counts.students} />
                    </h2>
                    <p className="mb-0">Total Students</p>
                  </div>
                </div>
              </div>
              <div className="vector-box-wrapper small-box position3">
                <div className="vector-box-content text-center">
                  <div>
                    <h2>
                    <CountUp end={counts.totalComplaints} />
                    </h2>
                    <p className="mb-0">Total Complaints</p>
                  </div>
                </div>
              </div>
              <div className="vector-box-wrapper big-box position4">
                <div className="vector-box-content big-content text-center">
                  <div className="big-head">
                    <h2>
                      <CountUp end={counts.resolvedComplaints} />
                    </h2>
                    <p className="mb-0">Resolved Complaints</p>
                  </div>
                </div>
              </div>
              <div className="vector-box-wrapper small-box position5">
                <div className="vector-box-content text-center">
                  <div>
                    <h2>
                      <CountUp end={counts.pendingComplaints} />
                    </h2>
                    <p className="mb-0">Pending Complaints</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <div className="achievement-content">
              <div className="p1">
                <p>Best Hostel Complaint Management System!</p>
              </div>
              <div className="p2">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam eaque ipsa
                  quae ab illo inventore veritatis
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FooterSection;
