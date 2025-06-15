// NavBar.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./NavBar.css";
import profile from "../assets/images/profile.png";
import ProfileMenu from "../Student_Dashboard/ProfileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HostelLogo from "../assets/images/HostelLogo1.png";
import Notification from "./Notification";

const NavBar = ({ setSearchQuery }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setearchQuery] = useState("");
  const [registrationNo, setRegistrationNo] = useState(
    localStorage.getItem("registrationNo") || ""
  );
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // ✅ Fetch registration number from backend and store in localStorage
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/users/profile`,
        {
          withCredentials: true,
        }
      );

      const { registrationNo } = response.data;

      // Save to localStorage if not already present
      if (!localStorage.getItem("registrationNo")) {
        localStorage.setItem("registrationNo", registrationNo);
        setRegistrationNo(registrationNo);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  // ✅ Handle registration number changes (for login/logout scenarios)
  useEffect(() => {
    const handleStorageChange = () => {
      const newRegNo = localStorage.getItem("registrationNo") || "";
      setRegistrationNo(newRegNo);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Fetch user data when component loads
  useEffect(() => {
    if (!registrationNo) {
      fetchUserData();
    }
  }, [registrationNo]);

  // ✅ Toggle profile menu
  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  // ✅ Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Updated Search Query:", e.target.value);
  };

  return (
    <div>
      <nav className="navbar">
        {/* Logo Section */}
        <div className="first-half">
          <div className="navbar-logo">
            <img src={HostelLogo} alt="Logo" />
            <h1>
              <i>Complaint Hub</i>
            </h1>
          </div>
          {/* Navbar Title */}
          <h1 className="navbar-title">HCMS</h1>
        </div>

        {/* Notification */}
        <div className="second-half">
          {/* Search Bar */}
          <Notification registrationNo={registrationNo}/>
          <form
            className="navbar-search"
            onSubmit={(e) => {
              e.preventDefault(); // ❌ Prevents page refresh
              setSearchQuery(localSearchQuery); // ✅ Set global searchQuery
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={localSearchQuery} // ✅ Use local state for live updates
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          {/* Profile Button */}
          <button onClick={toggleProfileMenu} className="profile-btn">
            Profile <img src={profile} alt="Profile" />
          </button>
        </div>
      </nav>

      {/* Profile Menu Component */}
      <ProfileMenu isOpen={isProfileMenuOpen} onClose={toggleProfileMenu} />
    </div>
  );
};

export default NavBar;
