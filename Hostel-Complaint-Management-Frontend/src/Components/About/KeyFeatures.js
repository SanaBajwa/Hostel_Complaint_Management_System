import React, { useState } from "react";
import "./KeyFeatures.css";

const KeyFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState("Agent Portal");

  const features = [
    { id: "Client Portal", icon: "👤" },
    { id: "Agent Portal", icon: "💻" },
    { id: "Integrations", icon: "🔗" },
  ];

  return (
    <section className="Features">
    <div className="key-features-container">
      <h2>Key Features</h2>
      <div className="features">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${
              selectedFeature === feature.id ? "selected" : ""
            }`}
            onClick={() => setSelectedFeature(feature.id)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-text">{feature.id}</div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default KeyFeatures;
