'use client';

import React from 'react';
import Image from 'next/image';

const OPENTABLE_NEWSLETTER_URL = 'https://www.opentable.co.uk/widget/comms/mural?rid=369630&lang=en-GB';

export default function Footer() {
  const handleOpenNewsletter = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-dhc-newsletter'));
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Left - EVOO Logo */}
        <div className="footer-logo">
          <Image src="/gold.png" alt="Delhi House Liverpool logo" width={200} height={200} />
        </div>

        {/* Center - Join Our Team */}
        <div className="footer-center">
          <h3 className="footer-heading">JOIN OUR TEAM</h3>
          <p className="footer-email">E: info@delhihousecafe.co.uk</p>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter">
          <h3 className="footer-heading">NEWSLETTER</h3>
          <p className="footer-newsletter-text">
            Subscribe for festive feasting, seasonal specials & exclusive invitations.
          </p>
          <div className="footer-newsletter-actions">
            <button 
              type="button"
              onClick={handleOpenNewsletter}
              className="footer-newsletter-btn"
            >
              <i className="fas fa-envelope"></i>
              <span>Subscribe</span>
            </button>
            <a 
              href={OPENTABLE_NEWSLETTER_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-newsletter-direct-link"
              title="Open subscription in new tab"
            >
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>

        {/* Right - Follow Our Journey */}
        <div className="footer-right">
          <h3 className="footer-heading">FOLLOW OUR JOURNEY</h3>
          <div className="social-icons">
            <div className="social-group">
              <a 
                href="https://www.instagram.com/delhihousecafe?igsh=dDhndXVtb3BvZ3d4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link" 
                aria-label="Instagram Delhi House Liverpool"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="social-group">
              <a 
                href="https://www.facebook.com/share/1ATYDKNhcW/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link" 
                aria-label="Facebook Delhi House Liverpool"
              >
                <i className="fab fa-facebook"></i>
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
