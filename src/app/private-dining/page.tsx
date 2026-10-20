'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '../../components/Footer';

export default function PrivateDiningPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const openContact = () => {
    setIsContactOpen(true);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  const openInquiry = () => {
    setIsInquiryOpen(true);
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
  };

  // Prevent body scroll when contact or inquiry is open
  useEffect(() => {
    if (isContactOpen || isInquiryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactOpen, isInquiryOpen]);

  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)"
    }
  };

  const slideInFromLeftVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1
    }
  };

  const slideInFromRightVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1
    }
  };

  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="private-dining-hero-section">
        <div className="private-dining-hero-image-container">
          <Image
            src="/restaurant.jpg"
            alt="Private Events at Delhi House Liverpool"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="private-dining-hero-overlay"></div>
        <div className="private-dining-hero-content">
          <div className="private-dining-hero-text-wrapper">
            <h1 className="private-dining-hero-title">PRIVATE EVENTS AT Delhi House Liverpool</h1>
            <h2 className="private-dining-hero-subtitle">CELEBRATE WITH US</h2>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <motion.section 
        className="private-dining-content-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="private-dining-content-wrapper">
          <motion.div 
            className="private-dining-text-content"
            variants={slideInFromLeftVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="private-dining-text">
              Whether it's a big family feast, a birthday bash, or a
              corporate celebration, Delhi House Liverpool is the perfect spot
              for an unforgettable event.
            </p>
            <p className="private-dining-text">
              Enjoy the vibrant flavours of Delhi — from bold street eats
              to refined classics — paired with crafted cocktails, fine
              wines, and refreshing mocktails. Our buzzing atmosphere,
              warm hospitality, and soulful food set the scene for a
              celebration like no other.
            </p>
            <p className="private-dining-text">
              Our dedicated events team will help you plan every detail
              — from décor to dining, music to drinks — ensuring your
              occasion feels truly personal and full of joy.
            </p>
            <div className="private-dining-highlight">
              <i className="fas fa-star"></i>
              <p className="private-dining-highlight-text">Start planning your perfect event today.</p>
            </div>
            <button 
              className="private-dining-cta-button"
              onClick={openContact}
            >
              <i className="fas fa-envelope"></i>
              GET IN TOUCH
            </button>
          </motion.div>
          <motion.div 
            className="private-dining-image-content"
            variants={slideInFromRightVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="private-dining-image-wrapper">
              <Image
                src="/food.jpg"
                alt="Private dining experience"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Additional Images Section */}
      <motion.section 
        className="private-dining-gallery-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="private-dining-gallery">
          <motion.div 
            className="private-dining-gallery-image"
            variants={fadeInUpVariants}
          >
            <Image
              src="/1.jpg"
              alt="Delhi House Liverpool ambiance"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          <motion.div 
            className="private-dining-gallery-image"
            variants={fadeInUpVariants}
          >
            <Image
              src="/2.jpg"
              alt="Delicious Indian cuisine"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          <motion.div 
            className="private-dining-gallery-image"
            variants={fadeInUpVariants}
          >
            <Image
              src="/3.jpg"
              alt="Festive celebration"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* OpenTable Private Dining Inquiry Section */}
      <motion.section 
        className="private-dining-booking-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <motion.div 
          className="private-dining-booking-wrapper"
          variants={fadeInUpVariants}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="private-dining-booking-header">
            <i className="fas fa-utensils"></i>
            <h2 className="private-dining-booking-title">BOOK YOUR PRIVATE EVENT</h2>
            <p className="private-dining-booking-subtitle">
              Reserve your exclusive dining experience at Delhi House Liverpool. 
              Submit an inquiry and our events team will get back to you.
            </p>
          </div>
          <div className="private-dining-inquiry-cta">
            <button 
              className="private-dining-inquiry-button"
              onClick={openInquiry}
            >
              <i className="fas fa-concierge-bell"></i>
              Inquire Now
            </button>
          </div>
          <div className="private-dining-booking-fallback">
            <p>Prefer to book by phone or email?</p>
            <div className="private-dining-booking-actions">
              <a 
                href="tel:+441512036988"
                className="private-dining-booking-link"
              >
                <i className="fas fa-phone"></i>
                +44 151 203 6988
              </a>
              <a 
                href="mailto:preen@delhihousecafe.co.uk"
                className="private-dining-booking-link"
              >
                <i className="fas fa-envelope"></i>
                preen@delhihousecafe.co.uk
              </a>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer />

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="private-dining-contact-overlay" onClick={closeContact}>
          <div className="private-dining-contact-content" onClick={(e) => e.stopPropagation()}>
            <div className="private-dining-contact-header">
              <h2>Get In Touch</h2>
              <button 
                className="private-dining-contact-close"
                onClick={closeContact}
                aria-label="Close contact form"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="private-dining-contact-body">
              <p>For private dining inquiries, please contact us:</p>
              <div className="private-dining-contact-info">
                <div className="private-dining-contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>LIVERPOOL</h4>
                    <p>+44 151 203 6988</p>
                  </div>
                </div>
                <div className="private-dining-contact-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h4>MANCHESTER</h4>
                    <p style={{ color: '#DDAB5A', fontStyle: 'italic' }}>Coming Soon</p>
                  </div>
                </div>
                <div className="private-dining-contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>EMAIL</h4>
                    <p>preen@delhihousecafe.co.uk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OpenTable Private Dining Inquiry Popup */}
      {isInquiryOpen && (
        <div className="private-dining-inquiry-overlay" onClick={closeInquiry}>
          <div className="private-dining-inquiry-popup" onClick={(e) => e.stopPropagation()}>
            <div className="private-dining-inquiry-popup-header">
              <h2>Contact Us</h2>
              <button 
                className="private-dining-contact-close"
                onClick={closeInquiry}
                aria-label="Close inquiry form"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="private-dining-inquiry-popup-body">
              <iframe
                src="https://www.opentable.co.uk/widget/private-dining/mural?rid=369630&type=form&colorThemeId=1&lang=en-GB&headlineButtonTitle=Inquire&title=Contact%20us&loadAllWidgets=false"
                width="100%"
                height="100%"
                frameBorder="0"
                title="OpenTable Private Dining Inquiry Form"
                allow="payment; camera; microphone; geolocation"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 'none', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}











