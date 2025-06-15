import React from "react";
import "./Content.css";

const Content = () => {
  return (
    <section className="content">
      <h2>Our Services</h2>
      <div className="service-cards">
        <div className="card">
          <h3>Web Design</h3>
          <p>Creating beautiful and functional websites.</p>
        </div>
        <div className="card">
          <h3>App Development</h3>
          <p>Building high-quality mobile applications.</p>
        </div>
        <div className="card">
          <h3>SEO Services</h3>
          <p>Improving your website's visibility and performance.</p>
        </div>
      </div>
    </section>
  );
};

export default Content;
