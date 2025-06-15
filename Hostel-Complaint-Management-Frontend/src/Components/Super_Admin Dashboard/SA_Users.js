import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SA_Users.css";

// Default and Hover Images
import DefaultImage from "../assets/images/superadmin.png";
import HoverImage from "../assets/images/New website design graph.png";

const roleToPath = {
  "CC": "/sa-cc-list",
  "RT": "/sa-rt-list",
  "Warden": "/sa-wardens-list",
  "Munshi": "/sa-munshi-list",
  "EndUser": "/sa-end-users-list",
  "Student": "/sa-students-list"
};

const KeyFeatureHome = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/distinct-roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleNewUserClick = () => {
    navigate("/add-new-user");
  };

  return (
    <div className="sa-user-integration-container w-container">
      <div className="sa-user-integration-heading-wrapper">
        <div data-aos="fade-up" className="sa-user-integration-box">
          <h1>Users</h1>
        </div>
      </div>

      <div className="sa-user-integration-channel-wrap">
        <div className="w-layout-grid integration-grid">
          {roles.map((role, index) => (
            <div
              className="sa-user-integration-app-item text-center"
              key={index}
              onClick={() => navigate(roleToPath[role] || "/")}
              style={{ backgroundColor: "black" }}
            >
              <div className="index-enhance-img">
                <img
                  src={DefaultImage}
                  alt={role}
                  onMouseOver={(e) => (e.currentTarget.src = HoverImage)}
                  onMouseOut={(e) => (e.currentTarget.src = DefaultImage)}
                  className="app-icon solution-card-icon-1"
                />
              </div>
              <div className="app-name center-align-feature-homePage">
                {role}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="add-user-button-container">
        <button className="add-user-button" onClick={handleNewUserClick}>
          + Add New User
        </button>
      </div>
    </div>
  );
};

export default KeyFeatureHome;
