import React from 'react';
import Image from 'next/image';
const Hero: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Full-screen image background */}
      <Image
        className="hero-image"
        src="/heroabout.jpg"
        alt="Hero background"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      
      {/* Overlay for better text visibility */}
      <div className="hero-overlay"></div>
      
      {/* Centered content */}
      <div className="hero-content">
       <Image src="/trans.png" alt="Hero background" width={400} height={400} />
        <div className="hero-divider"></div>
      </div>
    </div>
  );
};

export default Hero;
