import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Full-screen video background */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero/evohero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for better text visibility */}
      <div className="hero-overlay"></div>
      
      {/* Centered content */}
      <div className="hero-content">
        <h1 className="hero-title">DELHI HOUSE CAFE</h1>
        <div className="hero-divider"></div>
      </div>
    </div>
  );
};

export default Hero;
