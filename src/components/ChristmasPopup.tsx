'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ChristmasPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Do not show popup if already on the Christmas page
    if (pathname === '/christmas') {
      return;
    }

    // Check if user has already dismissed or interacted with the popup in this session
    const hasSeenPopup = sessionStorage.getItem('dhc_christmas_popup_seen');
    if (!hasSeenPopup) {
      // Small delay for smooth entry after website loads
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('dhc_christmas_popup_seen', 'true');
  };

  const handleGoToChristmas = () => {
    sessionStorage.setItem('dhc_christmas_popup_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen || pathname === '/christmas') {
    return null;
  }

  return (
    <div 
      className="christmas-popup-overlay" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="christmas-popup-title"
    >
      <div 
        className="christmas-popup-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="christmas-popup-close-btn" 
          onClick={handleClose}
          aria-label="Close Christmas announcement"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Image Header with Festive Badge */}
        <div className="christmas-popup-image-container">
          <Image
            src="/chrsitmas/christ1.jpg"
            alt="Christmas Feasting at Delhi House Liverpool"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 620px"
            style={{ objectFit: 'cover' }}
          />
          <div className="christmas-popup-image-gradient"></div>
          
          <div className="christmas-popup-badge">
            <i className="fas fa-holly-berry"></i>
            <span>FESTIVE CELEBRATIONS 2026</span>
            <i className="fas fa-holly-berry"></i>
          </div>
        </div>

        {/* Card Content */}
        <div className="christmas-popup-body">
          <p className="christmas-popup-subtitle">
            Tasty Tidings & Festive Feasting
          </p>

          <h2 id="christmas-popup-title" className="christmas-popup-heading">
            Christmas at Delhi House Liverpool
          </h2>

          <p className="christmas-popup-description">
            Step into a magical celebration at the Royal Albert Dock! Our chefs have crafted two spectacular festive menus filled with authentic Delhi flavours, festive spices, and sparkling cocktails.
          </p>

          {/* Festive Highlight Pills */}
          <div className="christmas-popup-highlights">
            <div className="christmas-popup-pill">
              <i className="fas fa-calendar-alt"></i>
              <span>8th Nov – 24th Dec</span>
            </div>
            <div className="christmas-popup-pill">
              <i className="fas fa-utensils"></i>
              <span>Festive & Classics Feasts</span>
            </div>
            <div className="christmas-popup-pill">
              <i className="fas fa-users"></i>
              <span>Groups & Parties Welcome</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="christmas-popup-actions">
            <Link 
              href="/christmas" 
              onClick={handleGoToChristmas}
              className="christmas-popup-primary-btn"
            >
              <span>Explore Christmas Celebrations</span>
              <i className="fas fa-arrow-right"></i>
            </Link>

            <button 
              type="button" 
              onClick={handleClose} 
              className="christmas-popup-dismiss-btn"
            >
              Continue to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

