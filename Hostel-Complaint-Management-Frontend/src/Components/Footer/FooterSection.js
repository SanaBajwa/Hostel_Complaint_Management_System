import React from "react";
import "./FooterSection.css";
import { Col, Container, Row } from "react-bootstrap";
import LogoImg from "../assets/images/HostelLogo1.png";
const FooterSection = () => {
    return (
        <section className="AboutBeeTheTeacherWrapper">
            <Container>
                <Row>
                    <Col lg={3}>
                        <div className="logo-photo">
                            <img src={LogoImg} alt="Logo" />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="about-BTT">
                        <h2>About Us</h2>
<p>
    Our system helps streamline hostel complaint handling by connecting students,
    RTs, wardens, and staff through one platform, ensuring fast and transparent
    resolution of issues across all university hostels.
</p>

                        </div>
                        <div className="follow-up">
                            <h2>Follow Us </h2>
                            <div className="follow-icons ">
                                <ul class=" mt-3 d-flex">
                                    <li>
                                        <a
                                            href="https://www.byhomekipudyxa.co"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                width={18}
                                                height={18}
                                                data-prefix="fab"
                                                data-icon="facebook-f"
                                                class="svg-inline--fa fa-facebook-f "
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.byhomekipudyxa.co"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clip-path="url(#clip0_848_8223)">
                                                    <path
                                                        d="M13.0325 0H4.96721C2.22829 0 0 2.2284 0 4.96732V13.0326C0 15.7716 2.22829 17.9999 4.96721 17.9999H13.0325C15.7716 17.9999 17.9999 15.7715 17.9999 13.0326V4.96732C18 2.2284 15.7716 0 13.0325 0ZM16.403 13.0326C16.403 14.891 14.891 16.4029 13.0326 16.4029H4.96721C3.1089 16.403 1.59704 14.891 1.59704 13.0326V4.96732C1.59704 3.10901 3.1089 1.59704 4.96721 1.59704H13.0325C14.8909 1.59704 16.4029 3.10901 16.4029 4.96732V13.0326H16.403Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M8.99945 4.3623C6.44195 4.3623 4.36133 6.44292 4.36133 9.00042C4.36133 11.5578 6.44195 13.6383 8.99945 13.6383C11.5569 13.6383 13.6376 11.5578 13.6376 9.00042C13.6376 6.44292 11.5569 4.3623 8.99945 4.3623ZM8.99945 12.0412C7.32266 12.0412 5.95837 10.6771 5.95837 9.00031C5.95837 7.32343 7.32256 5.95924 8.99945 5.95924C10.6763 5.95924 12.0405 7.32343 12.0405 9.00031C12.0405 10.6771 10.6762 12.0412 8.99945 12.0412Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M13.8333 3.00781C13.5256 3.00781 13.2233 3.13238 13.006 3.35064C12.7876 3.56784 12.6621 3.87021 12.6621 4.17897C12.6621 4.48678 12.7877 4.78904 13.006 5.0073C13.2232 5.2245 13.5256 5.35013 13.8333 5.35013C14.142 5.35013 14.4433 5.2245 14.6616 5.0073C14.8799 4.78904 15.0044 4.48667 15.0044 4.17897C15.0044 3.87021 14.8799 3.56784 14.6616 3.35064C14.4444 3.13238 14.142 3.00781 13.8333 3.00781Z"
                                                        fill="black"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_848_8223">
                                                        <rect width="18" height="18" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.bywyjonavyhepev.in"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.9972 14.9996L15.001 14.999V9.49776C15.001 6.80652 14.4216 4.7334 11.2754 4.7334C9.76288 4.7334 8.74788 5.5634 8.33351 6.35027H8.28976V4.98465H5.30664V14.999H8.41288V10.0403C8.41288 8.73464 8.66038 7.47214 10.2773 7.47214C11.8704 7.47214 11.8941 8.96214 11.8941 10.124V14.9996H14.9972Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M0.248047 4.98535H3.35804V14.9997H0.248047V4.98535Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M1.80125 0C0.806873 0 0 0.806874 0 1.80125C0 2.79562 0.806873 3.61937 1.80125 3.61937C2.79562 3.61937 3.60249 2.79562 3.60249 1.80125C3.60187 0.806874 2.79499 0 1.80125 0Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.nife.cc"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg
                                                width="16"
                                                height="11"
                                                viewBox="0 0 16 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15.6703 1.72124C15.486 1.04818 14.9455 0.517618 14.2602 0.336384C13.0081 0 7.99982 0 7.99982 0C7.99982 0 2.9917 0 1.73965 0.323631C1.06748 0.504672 0.513868 1.04828 0.329493 1.72124C0 2.95056 0 5.5 0 5.5C0 5.5 0 8.06229 0.329493 9.27876C0.514063 9.95172 1.0543 10.4823 1.73975 10.6635C3.00489 11 8.00002 11 8.00002 11C8.00002 11 13.0081 11 14.2602 10.6764C14.9456 10.4952 15.486 9.96467 15.6705 9.29171C15.9999 8.06229 15.9999 5.51295 15.9999 5.51295C15.9999 5.51295 16.0131 2.95056 15.6703 1.72124ZM6.40529 7.85527V3.14473L10.5699 5.5L6.40529 7.85527Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="Usefull-Links">
                            <ul>
                                Usefull Links
                                <li>About Us</li>
                                <li>Complaints</li>
                                <li>Students</li>
                                <li>Room-Details</li>
                                <li>Hostels</li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg={3}>
                    <div className="course-BTT">
                        <ul>
                            Complaints
                            <li>Electricity</li>
                            <li>
                                Plumber
                            </li>
                            <li>
                                Carpenter
                            </li>
                            <li>
                                Mess
                            </li>
                            <li>Other</li>
                        </ul>
                    </div>
                    </Col>
                </Row>
                <div className="copyright-section">
                    <p>Copyright ©2024 by <span>Hostel Complaint Management System</span>. All Rights Reserved.</p>
                </div>
            </Container>
        </section>
    );
};

export default FooterSection;
