'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '../../components/Footer';

export default function PrivateDiningPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => {
    setIsContactOpen(true);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  // Prevent body scroll when contact is open
  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactOpen]);

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
            alt="Private Events at Delhi House Café"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="private-dining-hero-overlay"></div>
        <div className="private-dining-hero-content">
          <div className="private-dining-hero-text-wrapper">
            <h1 className="private-dining-hero-title">PRIVATE EVENTS AT DELHI HOUSE CAFÉ</h1>
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
              corporate celebration, Delhi House Café is the perfect spot
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
              alt="Delhi House Café ambiance"
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
                    <h4>MANCHESTER</h4>
                    <p>+44 161 834 3333</p>
                  </div>
                </div>
                <div className="private-dining-contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>LIVERPOOL</h4>
                    <p>+44 151 708 7416</p>
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
    </main>
  );
}











