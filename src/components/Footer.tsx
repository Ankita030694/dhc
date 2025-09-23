import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Left - EVOO Logo */}
        <div className="footer-logo">
          <Image src="/trans.png" alt="Footer logo" width={400} height={400} />
        </div>

        {/* Center - Join Our Team */}
        <div className="footer-center">
          <h3 className="footer-heading">JOIN OUR TEAM</h3>
          <p className="footer-email">E: careers@dhc.com</p>
        </div>

        {/* Right - Follow Our Journey */}
        <div className="footer-right">
          <h3 className="footer-heading">FOLLOW OUR JOURNEY</h3>
          <div className="social-icons">
            <div className="social-group">
              <a href="#" className="social-link" aria-label="Instagram Delhi">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="social-group">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
            <div className="social-group">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <div className="social-group">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
        
           
          </div>
        </div>

        {/* Curved Arrow */}
        <div className="footer-arrow">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 50 Q50 20 80 10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M75 8 L80 10 L78 15" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}


