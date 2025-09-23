import React from 'react';
import Image from 'next/image';
const Hero: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Full-screen video background */}
      <Image
        className="hero-video"
        src="/herobg.jpg"
        alt="Hero background"
        width={1920}
        height={1080}
      />
      
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
