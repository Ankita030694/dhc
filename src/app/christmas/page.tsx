'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '../../components/Footer';

export default function ChristmasPage() {
  const [isReservationPopupOpen, setIsReservationPopupOpen] = useState(false);

  const openReservationPopup = () => {
    setIsReservationPopupOpen(true);
  };

  const closeReservationPopup = () => {
    setIsReservationPopupOpen(false);
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isReservationPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReservationPopupOpen]);

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
      <section className="christmas-hero-section">
        <div className="christmas-hero-image-container">
          <Image
            src="/chrsitmas/christ1.jpg"
            alt="Christmas at Delhi"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="christmas-hero-overlay"></div>
        <div className="christmas-hero-content">
          <div className="christmas-hero-text-wrapper">
            <p className="christmas-hero-subtitle">
              <span className="christmas-subtitle-text">Tasty tidings and festive feasting</span>
              <span className="christmas-pattern">{'><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>'}</span>
            </p>
            <h1 className="christmas-hero-title">CHRISTMAS AT Delhi</h1>
          </div>
        </div>
      </section>

      {/* First Content Section - Image Right, Text Left */}
      <motion.section 
        className="christmas-content-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="christmas-content-wrapper">
          <motion.div 
            className="christmas-text-content"
            variants={slideInFromLeftVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="christmas-section-heading">Join Us for Christmas 2025</h2>
            <p className="christmas-section-text">
              At Delhi House Café, we take Christmas seriously — and
              joyfully! This year, our chefs have crafted two spectacular
              menus, perfect for work parties, family gatherings, or festive
              get-togethers.
            </p>
            <div className="christmas-info-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Available from 8th November to 24th December</span>
            </div>
            <div className="christmas-info-item">
              <i className="fas fa-users"></i>
              <span>For groups of six or more</span>
            </div>
            <button 
              className="christmas-book-button"
              onClick={openReservationPopup}
            >
              <i className="fas fa-calendar-check"></i>
              Book now for christmas
            </button>
          </motion.div>
          <motion.div 
            className="christmas-image-content"
            variants={slideInFromRightVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="christmas-image-wrapper">
              <Image
                src="/chrsitmas/christ2.jpg"
                alt="Christmas feast"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Christmas Feasting Section */}
      <motion.section 
        className="christmas-feasting-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="christmas-feasting-wrapper">
          <motion.div 
            className="christmas-feasting-image"
            variants={slideInFromLeftVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="christmas-feasting-image-container">
              <Image
                src="/chrsitmas/christ3.jpg"
                alt="Christmas feasting"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="christmas-feasting-text-box"
            variants={slideInFromRightVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="christmas-feasting-heading">CHRISTMAS FEASTING</h2>
            <p className="christmas-feasting-text">
              The Christmas Feast is a magnificent array of Delhi-inspired festive specials, all-new dishes, as well as Delhi favourites. Opt for the Classics Feast for a non-festive alternative. Each feast includes all the dishes on the menu. Drinks and optional service charge are not included in the price.
            </p>
            <a href="/christmas_menu.pdf" target="_blank" rel="noopener noreferrer">
            <button className="christmas-feasting-button">
              See Feasting Menu
            </button>
            </a>
          </motion.div>
        </div>
      </motion.section>


      {/* <motion.section 
        className="christmas-tidings-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="christmas-tidings-wrapper">
          <motion.div 
            className="christmas-tidings-text-content"
            variants={slideInFromLeftVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="christmas-tidings-heading">TASTY TIDINGS...</h2>
            <h3 className="christmas-tidings-subheading">A Delhi Christmas First: Merry Breakfast Naan Collab</h3>
            <p className="christmas-tidings-text">
              'Tis the season to make merry mischief together. Our friend Seema Pankhania has slipped into the Delhi kitchen to sprinkle a little festive magic over our Breakfast Naan Rolls. Seema's festive favourites, honey-glazed pigs-in-blankets and rich vegan stuffing, are made irresistibly craveable with her secret spice mix.
            </p>
            <p className="christmas-tidings-text">
              Each filling is wrapped in fluffy, tandoor-hot naan with two fried eggs, cranberry cream cheese, tomato chilli jam and fresh coriander leaves for good measure. Choose from Non-Veg., Veg. or Vegan - Christmas morning's come early. Available 17th November - 24th December, 'til 11.45am.
            </p>
            <button 
              className="christmas-tidings-button"
              onClick={openReservationPopup}
            >
              Book festive breakfasts
            </button>
          </motion.div>
          <motion.div 
            className="christmas-tidings-image-content"
            variants={slideInFromRightVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="christmas-tidings-image-wrapper">
              <Image
                src="/chrsitmas/christ4.jpg"
                alt="Tasty tidings breakfast"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section> */}

      {/* Christmas Gift Guide Section */}
      <motion.section 
        className="christmas-guide-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="christmas-guide-wrapper">
          <motion.div 
            className="christmas-guide-image"
            variants={slideInFromLeftVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="christmas-guide-image-container">
              <Image
                src="/chrsitmas/christ5.jpg"
                alt="Christmas gift guide"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="christmas-guide-text-content"
            variants={slideInFromRightVariants}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="christmas-guide-line christmas-guide-line-top"></div>
            <h2 className="christmas-guide-heading">GUIDE</h2>
            <h3 className="christmas-guide-subheading" style={{ marginTop: '-20px' }}>CHRISTMAS GIFT GUIDE</h3>
            <p className="christmas-guide-text" style={{ marginTop: '-10px' }}>
            A selection of exceptional gift cards and delights for the holiday season — perfect for every taste and every budget.
            </p>
            <a href="/gift-cards">
            <button className="christmas-guide-button">
              Purchase Gift Card
            </button> </a>
            <div className="christmas-guide-line christmas-guide-line-bottom"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Second Content Section - Main Content */}
      <motion.section 
        className="christmas-main-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <div className="christmas-main-container">
          <motion.h2 
            className="christmas-main-heading"
            variants={textRevealVariants}
          >
            <i className="fas fa-tree"></i> Christmas at Delhi House Café 2025 <i className="fas fa-tree"></i>
          </motion.h2>
          
          <motion.p 
            className="christmas-main-intro"
            variants={textRevealVariants}
          >
            A joyful feast filled with sparkle, good cheer, and all the
            flavours of Delhi.
          </motion.p>

          <motion.p 
            className="christmas-main-text"
            variants={textRevealVariants}
          >
            Christmas at Delhi House Café is a time of togetherness,
            laughter, and feasting. Our home is decked out in dazzling
            baubles, twinkling lights, and festive touches — setting the
            perfect scene for a truly merry celebration.
          </motion.p>

          <motion.p 
            className="christmas-main-text"
            variants={textRevealVariants}
          >
            Gather friends, family, and colleagues around our tables
            laden with lavish Festive Feasts, seasonal specials, and
            tipples. Expect warmth, good humour, and the very best
            food and drink we ever do.
          </motion.p>

          {/* Image Grid */}
          <motion.div 
            className="christmas-image-grid"
            variants={staggerContainerVariants}
          >
            <motion.div 
              className="christmas-grid-image"
              variants={fadeInUpVariants}
            >
              <Image
                src="/chrsitmas/christ3.jpg"
                alt="Christmas celebration"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div 
              className="christmas-grid-image"
              variants={fadeInUpVariants}
            >
              <Image
                src="/chrsitmas/christ4.jpg"
                alt="Festive feast"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div 
              className="christmas-grid-image"
              variants={fadeInUpVariants}
            >
              <Image
                src="/chrsitmas/christ5.jpg"
                alt="Christmas menu"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="christmas-highlight-section"
            variants={textRevealVariants}
          >
            <div className="christmas-highlight-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3 className="christmas-highlight-heading">Join Us for Christmas 2025</h3>
            <p className="christmas-highlight-text">
              At Delhi House Café, we take Christmas seriously — and joyfully! This year, our chefs have created a spectacular Christmas menu, perfect for work parties, family gatherings, and festive get-togethers.
            </p>
            <div className="christmas-info-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Available from 8th November to 24th December</span>
            </div>
            <div className="christmas-info-item">
              <i className="fas fa-users"></i>
              <span>For groups of six or more</span>
            </div>
          </motion.div>

          {/* Feast Options */}
          <motion.div 
            className="christmas-feasts-section"
            variants={staggerContainerVariants}
          >
            <motion.div 
              className="christmas-feast-card"
              variants={fadeInUpVariants}
            >
              <div className="christmas-feast-icon">
                <i className="fas fa-glass-cheers"></i>
              </div>
              <h3 className="christmas-feast-heading">The Christmas Feast</h3>
              <p className="christmas-feast-text">
                A decadent selection of festive favourites and exciting new
                creations — designed to delight every palate.
              </p>
              <a
                href="/christmas_menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="christmas-feast-link"
              >
                View Christmas Feast Menu (PDF)
              </a>
            </motion.div>

            <motion.div 
              className="christmas-feast-card"
              variants={fadeInUpVariants}
            >
              <div className="christmas-feast-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3 className="christmas-feast-heading">The Delhi Classics</h3>
              <p className="christmas-feast-text">
                A generous alternative for those who prefer our beloved
                signature dishes, served with festive flair.
              </p>
              <a
                href="/food.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="christmas-feast-link"
              >
                View Delhi Classics Menu (PDF)
              </a>
            </motion.div>
          </motion.div>

          <motion.p 
            className="christmas-main-text"
            variants={textRevealVariants}
          >
            Both feasts come with Non-Veg, Veg, and Vegan menu
            options, ensuring everyone has a seat — and a plate — at the
            table.
          </motion.p>

          <motion.p 
            className="christmas-main-text"
            variants={textRevealVariants}
          >
            Smaller groups can enjoy our All-Day Menu enhanced with
            seasonal specials and festive cocktails.
          </motion.p>

          <motion.p 
            className="christmas-main-text christmas-closing"
            variants={textRevealVariants}
          >
            Come eat, drink, and be merry — Delhi-style.
          </motion.p>

          <motion.div 
            className="christmas-cta-section"
            variants={textRevealVariants}
          >
            <button 
              className="christmas-cta-button"
              onClick={openReservationPopup}
            >
              <i className="fas fa-calendar-check"></i>
              Book your table now and make this Christmas one to remember!
            </button>
          </motion.div>

          {/* Final Image */}
          <motion.div 
            className="christmas-final-image"
            variants={fadeInUpVariants}
          >
            <Image
              src="/chrsitmas/chrsit6.jpg"
              alt="Christmas celebration"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </motion.section>

      <Footer />

      {/* Reservation Modal */}
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
    </main>
  );
}

