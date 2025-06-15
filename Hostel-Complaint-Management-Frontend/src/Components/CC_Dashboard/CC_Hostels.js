import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Super_Admin Dashboard/SA_Hostels.css";

// Default and Hover Images
import Image1 from "../assets/images/images.png";
import Image4 from "../assets/images/images.png";
import Image6 from "../assets/images/images.png";
import Image7 from "../assets/images/images.png";
import HoverImage1 from "../assets/images/New website design graph.png";
import HoverImage4 from "../assets/images/New website design graph.png";
import HoverImage6 from "../assets/images/New website design graph.png";
import HoverImage7 from "../assets/images/New website design graph.png";
import axios from "axios";

const features = [
  { img: Image1, hoverImg: HoverImage1, alt: "Complaints Management" },
  { img: Image4, hoverImg: HoverImage4, alt: "Real Time Tracking of Complaint" },
  { img: Image6, hoverImg: HoverImage6, alt: "Effectively Manage Root User Role" },
  { img: Image7, hoverImg: HoverImage7, alt: "Collect Suggestions and Feedback" },
];
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CCHostels = () => {
  const navigate = useNavigate();

  const handleHostelClick = (name) => {
    const hostelName = name.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase and replace spaces with dashes
    navigate("/graph-view/"+hostelName); // Navigates to Add New Hostel page
  };
  const [hostels, setHostels] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/hostels`
        );
        setHostels(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error.message);
      }
    };

    fetchHostels();
  }, []);

  return (
    <div className="sa-integration-container w-container">
      <div className="sa-integration-heading-wrapper">
        <div data-aos="fade-up" className="sa-integration-box">
          <h1>Hostels</h1>
        </div>
      </div>
      <div className="sa-integration-channel-wrap">
        <div className="w-layout-grid integration-grid">
          {hostels.map((hostel, index) => (
            <div
              className="sa-integration-app-item text-center"
              key={index}
              style={{ backgroundColor: hostel.bgColor || "black" }}
              onClick={()=>handleHostelClick(hostel.name)}
            >
              <div className="index-enhance-img">
                <img
                  src={features[0].img}
                  alt={features[0].alt}
                  onMouseOver={(e) => (e.currentTarget.src = features[0].hoverImg)}
                  onMouseOut={(e) => (e.currentTarget.src = features[0].img)}
                  className="app-icon solution-card-icon-1"
                />
              </div>
              <div className="app-name center-align-feature-homePage">
                {hostel.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CCHostels;
