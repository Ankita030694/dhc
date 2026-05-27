'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';

const CurlyDivider: React.FC = () => (
  <svg width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M1 0C1.5 5 0.5 10 1.5 15C0.5 20 1.5 25 0.5 30C1.5 35 1 40 1 40" 
      stroke="white" 
      strokeWidth="0.5" 
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isReservationPopupOpen, setIsReservationPopupOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (100vh)
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Show navbar when user scrolls past the hero section
      if (scrollY > heroHeight * 0.8) { // Show when 80% past hero
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Track if user has scrolled at all for blur effect
      setHasScrolled(scrollY > 0);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openReservationPopup = () => {
    setIsReservationPopupOpen(true);
  };

  const closeReservationPopup = () => {
    setIsReservationPopupOpen(false);
  };

  // Prevent body scroll when popup is open and handle iframe navigation
  useEffect(() => {
    if (isReservationPopupOpen) {
      document.body.style.overflow = 'hidden';
      
      // Add message listener for iframe communication
      const handleMessage = (event: MessageEvent) => {
        // Handle messages from OpenTable iframe
        if (event.origin.includes('opentable.co.uk')) {
          console.log('OpenTable iframe message:', event.data);
          
          // If OpenTable tries to navigate, we can handle it here
          if (event.data && typeof event.data === 'object') {
            if (event.data.type === 'navigation' || event.data.action === 'redirect') {
              // Prevent external navigation by not allowing it
              event.preventDefault();
              return false;
            }
          }
        }
      };

      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReservationPopupOpen]);

  // Close desktop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDesktopMenuOpen && 
          !target.closest('.desktop-menu-dropdown') && 
          !target.closest('.hamburger-menu-toggle')) {
        setIsDesktopMenuOpen(false);
      }
    };

    if (isDesktopMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopMenuOpen]);

  return (
    <nav className={`navbar ${isVisible ? 'visible' : ''} ${hasScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Mobile Layout */}
        <div className="navbar-mobile">
          {/* Mobile Logo */}
          <div className="navbar-mobile-logo">
            <Image 
              src="/trans.png" 
              alt="Delhi House Cafe" 
              width={80} 
              height={16}
              className="navbar-logo"
              priority
            />
          </div>
          
          {/* Mobile Burger Menu */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="mobile-menu-dropdown">
              <button className="reservation-btn mobile" onClick={openReservationPopup}>
                MAKE A RESERVATION
              </button>
              <div className="mobile-nav-links">
                <a href="/about">  
                <button className="nav-btn mobile">ABOUT US</button>
                </a>
                <a href="/gift-cards">
                  <button className="nav-btn mobile">GIFT CARDS</button>
                </a>
                  <div className="mobile-menu-section">
                  <span className="mobile-menu-label">MENU</span>
                  <a 
                    href="/DHC%20-%20Food%20Menu%20SS%2026%20(594%20x%20420%20mm).pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mobile-menu-item"
                  >
                    <i className="fas fa-utensils"></i>
                    Food Menu
                  </a>
                  <a 
                    href="/drinks.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mobile-menu-item"
                  >
                    <i className="fas fa-cocktail"></i>
                    Drinks Menu
                  </a>
                </div>
                <a href="/private-dining">  
                <button className="nav-btn mobile">PRIVATE DINING</button>
                </a>
                <a href="/contact">  
                <button className="nav-btn mobile">CONTACT</button>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="navbar-desktop">
          {/* Left - Hamburger Menu */}
          <div className="navbar-left">
            <button 
              className="hamburger-menu-toggle"
              onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`fas ${isDesktopMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            
            {/* Desktop Menu Dropdown */}
            {isDesktopMenuOpen && (
              <div className="desktop-menu-dropdown">
                <div className="desktop-nav-links">
                  <a href="/about" onClick={() => setIsDesktopMenuOpen(false)}>  
                    <button className="nav-btn desktop-menu-btn">ABOUT US</button>
                  </a>
                  <a href="/gift-cards" onClick={() => setIsDesktopMenuOpen(false)}>  
                    <button className="nav-btn desktop-menu-btn">Gift Cards</button>
                  </a>
                  <div className="desktop-menu-section">
                    <button className="nav-btn desktop-menu-btn">MENU</button>
                    <div className="desktop-menu-items">
                      <a 
                        href="/DHC%20-%20Food%20Menu%20SS%2026%20(594%20x%20420%20mm).pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="desktop-menu-item"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        <i className="fas fa-utensils"></i>
                        Food Menu
                      </a>
                      <a 
                        href="/drinks.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="desktop-menu-item"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        <i className="fas fa-cocktail"></i>
                        Drinks Menu
                      </a>
                    </div>
                  </div>
                 
                  <a href="/private-dining" onClick={() => setIsDesktopMenuOpen(false)}>  
                    <button className="nav-btn desktop-menu-btn">PRIVATE DINING</button>
                  </a>
                  <a href="/contact" onClick={() => setIsDesktopMenuOpen(false)}>  
                    <button className="nav-btn desktop-menu-btn">CONTACT</button>
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {/* Center - Delhi House Cafe Logo */}
          <Link href="/"> 
          <div className="navbar-center -mt-12">
            <Image 
              src="/trans.png" 
              alt="Delhi House Cafe" 
              width={95} 
              height={50}
              className="navbar-logo"
              priority
            />
          </div>
          </Link>
          
          {/* Right - Make a Reservation */}
          <div className="navbar-right">
            <button className="reservation-btn" onClick={openReservationPopup}>
              MAKE A RESERVATION
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Popup Modal */}
      {isReservationPopupOpen && (
        <div className="reservation-popup-overlay" onClick={closeReservationPopup}>
          <div className="reservation-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="reservation-popup-header">
              <h2>Make a Reservation</h2>
              <button 
                className="reservation-popup-close" 
                onClick={closeReservationPopup}
                aria-label="Close reservation popup"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="reservation-widget-container">
              <iframe 
                src="https://www.opentable.co.uk/booking/restref/availability?rid=227751&rid=369630&lang=en-GB&color=1&dark=false&embed=true&iframe=true&otSource=Restaurant%20website"
                width="100%"
                height="500"
                frameBorder="0"
                title="OpenTable Reservation Widget"
                allow="payment; camera; microphone; geolocation"
                referrerPolicy="no-referrer-when-downgrade"
                id="opentable-reservation-iframe"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
