import React from "react";
import "./KeyFeatureHome.css";

// Default and Hover Images
import Image1 from "../assets/images/images.png";
import Image2 from "../assets/images/images.png";
import Image3 from "../assets/images/images.png";
import Image4 from "../assets/images/images.png";
import Image5 from "../assets/images/images.png";
import Image6 from "../assets/images/images.png";
import Image7 from "../assets/images/images.png";
import Image8 from "../assets/images/images.png";
import Image9 from "../assets/images/images.png";
import Image10 from "../assets/images/images.png";
import Image11 from "../assets/images/images.png";
import Image12 from "../assets/images/images.png";
import HoverImage1 from "../assets/images/New website design graph.png";
import HoverImage2 from "../assets/images/New website design graph.png";
import HoverImage3 from "../assets/images/New website design graph.png";
import HoverImage4 from "../assets/images/New website design graph.png";
import HoverImage5 from "../assets/images/New website design graph.png";
import HoverImage6 from "../assets/images/New website design graph.png";
import HoverImage7 from "../assets/images/New website design graph.png";
import HoverImage8 from "../assets/images/New website design graph.png";
import HoverImage9 from "../assets/images/New website design graph.png";
import HoverImage10 from "../assets/images/New website design graph.png";
import HoverImage11 from "../assets/images/New website design graph.png";
import HoverImage12 from "../assets/images/New website design graph.png";


const features = [
  { img: Image1, hoverImg: HoverImage1,    alt: "Complaints Management",
    title: "Complaints Management", },
  { img: Image4, hoverImg: HoverImage4,  alt: "Real Time Tracking of Complaint",
    title: "Real Time Tracking of Complaint",},
  { img: Image6, hoverImg: HoverImage6,    alt: "Effectively Manage Root User Role",
    title: "Effectively Manage Root User Role", },
  { img: Image7, hoverImg: HoverImage7,    alt: "Collect Suggestions and Feedback",
    title: "Collect Suggestions and Feedback",},
  { img: Image8, hoverImg: HoverImage8,     alt: "Notifications",
    title: "Notifications", },
  { img: Image9, hoverImg: HoverImage9,  alt: "Effectively manage graphical view",
    title: "Effectively manage graphical view", },
  { img: Image11, hoverImg: HoverImage11,     alt: "Manage no outsider can complaint",
    title: "Manage no outsider can complaint", },
 

];

const KeyFeatureHome = () => {
  return (
    <div className="integration-container w-container">
      <div className="integration-heading-wrapper">
        <div data-aos="fade-up" className="integration-box">
          <h1>Features</h1>
        </div>
      </div>
      <div className="integration-channel-wrap">
        <div className="w-layout-grid integration-grid">
          {features.map((feature, index) => (
            <div
              className="integration-app-item text-center"
              key={index}
              style={{ backgroundColor: feature.bgColor || "black" }}
            >
              <div className="index-enhance-img">
                <img
                  src={feature.img}
                  alt={feature.alt}
                  onMouseOver={(e) => (e.currentTarget.src = feature.hoverImg)}
                  onMouseOut={(e) => (e.currentTarget.src = feature.img)}
                  className="app-icon solution-card-icon-1"
                />
              </div>
              <div className="app-name center-align-feature-homePage">
                {feature.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatureHome;
