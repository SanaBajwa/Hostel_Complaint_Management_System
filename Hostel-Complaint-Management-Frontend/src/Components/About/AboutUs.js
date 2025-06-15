import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutImg from "../assets/images/complaint4.png";
import aboutcontentImg from "../assets/images/complaint2.jpg";
import classes1img from "../assets/images/complaint3.jpg";
import classes2img from "../assets/images/HostelLogo1.png";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="AboutUsWrapper ">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="home-aboutUs-contact-placeholder">
              <img src={aboutImg} alt="About Us" className="abotIMG" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="aboutClasses d-flex align-item-center flex-column justify-content-center">
              <h5>About Us</h5>
              <div className="integrated-heading">
                <p>
                  <b>Integrated Complaints Handling</b>
                </p>
              </div>
              <div className="integrated-para">
                <p>
                  The Hostel Complaint Management System is a comprehensive
                  platform designed to simplify, track, and streamline the
                  process of lodging and resolving complaints within a hostel
                  environment. By integrating modern technologies, it ensures
                  efficient communication between students (or residents) and
                  the responsible administrative roles such as wardens, tutors,
                  or assistants.
                </p>
              </div>
              {/* <div className="discover-more">
                <button className="discover">
                  Discover More
                  <svg
                    width="27"
                    height="16"
                    viewBox="0 0 27 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M25.8286 7.76953H1H25.8286Z" fill="black" />
                    <path
                      d="M25.8286 7.76953H1"
                      stroke="black"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.0586 1.0006L25.8278 7.76983L19.0586 14.5391"
                      fill="black"
                    />
                    <path
                      d="M19.0586 1.0006L25.8278 7.76983L19.0586 14.5391"
                      stroke="black"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div> */}
            </div>
          </Col>
        </Row>
        <Row className="sc-2 align-items-center py-5">
          <Col className="sc-2-col-1">
            <div className="d-flex align-items-center">
              <div className="home-aboutUs-contact-icon">
                <img
                  alt="Contact Icon"
                  fetchpriority="high"
                  width="50"
                  height="50"
                  decoding="async"
                  src={aboutcontentImg}
                  style={{ color: "transparent" }}
                />

                <div className="home-aboutUs-contact-desc ps-lg-4 ps-3">
                  <label>Need to Know More Details?</label>
                  <p className="mb-0 mt-lg-2 mt-0">nomimian01@gmail.com</p>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="flexible-class d-flex align-items-center">
              <div className="class-1">
                <img
                  alt="Contact Icon"
                  fetchpriority="high"
                  width="50"
                  height="50"
                  decoding="async"
                  src={classes1img}
                  style={{ color: "transparent" }}
                />

                <div className="classes-schedule ps-lg-4 ps-3">
                  <label>Tracking & Notification</label>
                  <p className="mb-0 mt-lg-2 mt-0">
                    The system offers real-time tracking and notifications,
                    enabling users to stay informed about the current status and
                    location of their complaints throughout the resolution
                    process.
                  </p>
                </div>
              </div>
            </div>
            <div className="live-classes d-flex align-items-center">
              <div className="class-2">
                <img
                  alt="Contact Icon"
                  fetchpriority="high"
                  width="50"
                  height="50"
                  decoding="async"
                  src={classes2img}
                  style={{ color: "transparent" }}
                />

                <div className="live-classes ps-lg-4 ps-3">
                  <label>Graphical View</label>
                  <p className="mb-0 mt-lg-2 mt-0">
                    The system offers a graphical view of complaint statuses for
                    users and roles like CC and RT, with real-time notifications
                    ensuring updates at every stage for transparency and
                    efficiency.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
