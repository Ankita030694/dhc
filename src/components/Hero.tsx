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
        width={1000}
        height={1000}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      
      {/* Overlay for better text visibility */}
      <div className="hero-overlay"></div>
      
      {/* Centered content */}
      <div className="hero-content">
       <Image src="/gold.png" alt="Delhi House Liverpool" width={400} height={400} priority />
        <div className="hero-divider"></div>
      </div>
    </div>
  );
};

export default Hero;
