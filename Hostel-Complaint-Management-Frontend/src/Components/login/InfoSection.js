import React from "react";
import "./InfoSection.css";

const SimpleSection = () => {
  return (
    <div className="simple-section">
      <p className="paragraph">
        Designed for individuals. See the analytics and grow your data for tasks remotely, from anywhere!
      </p>
      <img
        src="https://via.placeholder.com/400" // Replace with your image URL
        alt="Tilted Example"
        className="tilted-image"
      />
    </div>
  );
};

export default SimpleSection;
