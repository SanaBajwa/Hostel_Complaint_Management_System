import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeBannerSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import hostel1 from '../assets/images/hostel3.png'
import hostel2 from '../assets/images/complaint2.jpg'
import hostel3 from '../assets/images/graph1-removebg-preview.png'
import hostel4 from '../assets/images/superadmin-removebg-preview.png'

const HomeBannerSection = () => {
  return (
    <section className="homeBanner-section-wrapper position-relative">
      <Swiper
        // modules={[Autoplay]}
        // autoplay={{ delay: 4000 }}
        loop={true}
        className="multiBannerSlider"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <Container>
            <Row className="align-items-center py-5">
              <Col lg={6}>
                <div className="mbs-slide-content">
                  <h2 className="mb-3 slider1-title">Hostel Complaint Management System</h2>
                  <p>
                    "Welcome to the Hostel Complaint Management System. Quickly report and track hostel issues to ensure a better living experience. Log in to manage and resolve your complaints efficiently."
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mbs-slide-img">
                  <img
                    src={hostel1}
                    alt="hostel"
                    className="img-fluid max"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="mbs-slide-content">
                  <h2 className="mb-3 slider1-title">"Real-Time Complaint Tracking & Transparency"</h2>
                  <p>"Track Complaints Instantly: Users can file complaints, and admins can track the status in real time. Up-to-Date Information: Receive instant notifications on updates regarding complaints, including resolution progress and status changes. Efficient Monitoring: Students, RTs, Wardens, and other admins can monitor complaints in real-time, ensuring timely resolutions. Transparency: The real-time system allows full transparency, as users can see the status of their complaints, from submission to resolution."</p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mbs-slide-img">
                  <img
                    src={hostel2}
                    alt="hostel"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="mbs-slide-content">
                  <h2>"Graphical Insights for Efficient Complaint Management"</h2>
                  <p>"Visual Insights: Admins can view complaints and resolutions through graphical representations, making it easier to analyze trends and performance. Complaint Trends: Identify peak times for certain types of complaints (e.g., plumbing, electricity) through bar and line graphs. Resource Allocation: Admins can optimize resources based on the graphical data, ensuring better handling of issues. Efficient Management: The graphical view provides admins with a quick overview of how complaints are being handled, allowing for efficient decision-making."</p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mbs-slide-img">
                  <img
                    src={hostel3}
                    alt="hostel"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="mbs-slide-content">
                  <h2>"Superadmin Control for Seamless User Management"</h2>
                  <p>"Centralized Control: Superadmin has the authority to manage users across different roles like students, RTs, Wardens, Munshis, and others. Role Assignment: Superadmins can assign roles and permissions to users, ensuring that the right people have the right level of access. User Monitoring: Superadmins can monitor all users, review their activities, and handle user-related issues. Manage Permissions: Superadmins can modify or revoke permissions as necessary, ensuring that the system remains secure and efficient. Seamless User Onboarding: Superadmin can add new users, assign roles, and ensure that everyone has proper access to the platform."</p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mbs-slide-img">
                  <img
                    src={hostel4}
                    alt="hostel"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HomeBannerSection;
