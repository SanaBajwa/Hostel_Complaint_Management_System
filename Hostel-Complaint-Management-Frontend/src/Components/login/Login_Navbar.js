import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import HostelLogo from "../assets/images/HostelLogo1.png";
import "./Login_Navbar.css"; // Import CSS for the navbar and progress bar
import { Row, Col } from "react-bootstrap"; // Import ProgressBar
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const navigate = useNavigate(); // Initialize navigate function
  const [sideMenuOpen, setSideMenuOpen] = useState(false); // State for side navigation

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleSideMenu = () => {
    setSideMenuOpen((prev) => !prev); // Toggle the hamburger menu
  };
  const handleSignIn = () => {
    setIsLoading(true); // Show progress bar
    setTimeout(() => {
      setIsLoading(false); // Hide progress bar
      navigate("/login"); // Navigate to login page
    }, 2000); // 2 seconds progress animation
  };

  return (
    <div className="login-navbar">
      {isLoading && <div className="progress-bar"></div>} {/* Progress bar */}
      <nav className="navbar-login">
        <Row className="align-items-center w-100">
          {/* First Column: Logo */}
          <Col className="navbar-logo-container d-flex align-items-center justify-content-center">
            <div className="navbar-logo">
              <img src={HostelLogo} alt="Logo" />
              <h1>
                <i className="text-nowrap">Complaint Hub</i>
              </h1>
            </div>
          </Col>
          {/* Second Column: Navigation Menu */}
          <Col
            className={`navbar-menu-container ${sideMenuOpen ? "active" : ""}`}
          >
            <ul className="navbar-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="dropdown">
                <a href="#" className="text-nowrap">
                  Hostels &#x25BC;
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">Hostel A</a>
                  </li>
                  <li>
                    <a href="#">Hostel B</a>
                  </li>
                  <li>
                    <a href="#">Hostel C</a>
                  </li>
                  <li>
                    <a href="#">Hostel D</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="text-nowrap">
                  Services &#x25BC;
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">Electricity</a>
                  </li>
                  <li>
                    <a href="#">Mess</a>
                  </li>
                  <li>
                    <a href="#">Carpenter</a>
                  </li>
                  <li>
                    <a href="#">Plumber</a>
                  </li>
                  <li>
                    <a href="#">Others</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/aboutus" className="text-nowrap">
                  About Us
                </Link>
              </li>
            </ul>
          </Col>

          {/* Third Column: Sign-In Button */}
          <Col className="text-end">
            <button className="SingIn_btn" onClick={handleSignIn}>
              Sign In
            </button>
          </Col>
          {/* Hamburger Icon */}
          <div className="hamburger" onClick={toggleSideMenu}>
            <FontAwesomeIcon icon={sideMenuOpen ? faTimes : faBars} />
          </div>
        </Row>
      </nav>
    </div>
  );
};

export default LoginNavbar;
