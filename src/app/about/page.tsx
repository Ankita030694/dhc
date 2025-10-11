'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Footer from '../../components/Footer';
import VanishingText from '../../components/VanishingText';

// Helper function to split text into word spans
const splitTextIntoWords = (text: string) => {
  return text.split(' ').map((word, index, array) => (
    <span key={index} className="reveal-word">
      {word}
      {index < array.length - 1 && ' '}
    </span>
  ));
};

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  
  // Refs for experience section animations
  const experienceSectionRef = useRef<HTMLElement>(null);
  const restaurantImageRef = useRef<HTMLDivElement>(null);
  const foodImageRef = useRef<HTMLDivElement>(null);
  
  // Refs for scroll-driven text animation
  const revealSectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Scroll-based transforms for image zoom
  const { scrollYProgress } = useScroll({
    target: experienceSectionRef,
    offset: ["start center", "end center"]
  });
  
  // Transform scroll progress to scale values (1.0 to 1.2, then stop at 1.2)
  const restaurantImageScale = useTransform(
    scrollYProgress,
    [0.3, 0.6, 0.8, 1],
    [1, 1.2, 1.2, 1.2]
  );
  
  const foodImageScale = useTransform(
    scrollYProgress,
    [0.5, 0.8, 1, 1],
    [1, 1.2, 1.2, 1.2]
  );
  
  // Enhanced animation variants for experience section elements
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

  useEffect(() => {
    // Initialize reveal sections
    const sections = document.querySelectorAll('.reveal-section');
    revealSectionsRef.current = Array.from(sections) as HTMLDivElement[];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Get the horizontal slide section element to calculate when slide should start
      const slideSection = document.querySelector('.horizontal-slide-section') as HTMLElement;
      
      if (slideSection) {
        // Calculate animation trigger points
        const sectionStart = slideSection.offsetTop - window.innerHeight;
        const sectionEnd = slideSection.offsetTop + (slideSection.offsetHeight * 0.3); // Complete at 30% of section height
        const animationDistance = sectionEnd - sectionStart;
        
        // Calculate progress based on scroll position
        if (currentScrollY >= sectionStart && currentScrollY <= sectionEnd) {
          const progress = Math.max(0, Math.min(1, (currentScrollY - sectionStart) / animationDistance));
          setSectionProgress(progress);
        } else if (currentScrollY < sectionStart) {
          setSectionProgress(0);
        } else {
          setSectionProgress(1);
        }
      }

      // Handle scroll-driven text reveal animation
      const viewportHeight = window.innerHeight;

      revealSectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;

        const scrollableDistance = sectionHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, (-rect.top) / scrollableDistance));
        
        // Update word opacity based on progress
        const wordElements = section.querySelectorAll('.reveal-word');
        wordElements.forEach((wordEl, wordIndex) => {
          const element = wordEl as HTMLElement;
          const totalWords = wordElements.length;
          
          const wordProgressStart = wordIndex / totalWords;
          const wordProgressEnd = (wordIndex + 1) / totalWords;
          
          const wordProgress = Math.max(0, Math.min(1, 
            (progress - wordProgressStart) / (wordProgressEnd - wordProgressStart)
          ));
          
          const opacity = 0.2 + (wordProgress * 0.8);
          element.style.opacity = opacity.toString();
        });
      });
    };
    
    // Use throttled scroll handling for better performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <main>
      {/* About Us Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-image-container">
          <Image 
            src="/heroabout.jpg" 
            alt="Delhi House Café - Our Story" 
            fill
            priority
            style={{ objectFit: 'cover' }}
            quality={90}
          />
          <div className="about-hero-overlay"></div>
        </div>
        
        <motion.div 
          className="about-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="about-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            ABOUT US
          </motion.h1>
          <motion.div 
            className="about-hero-divider"
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
          <motion.p 
            className="about-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            From Delhi to Manchester - A Journey of Flavours
          </motion.p>
        </motion.div>
      </section>
      
      {/* Horizontal slide reveal image section */}
      <section 
        className="horizontal-slide-section"
        style={{
          '--scroll-progress': sectionProgress
        } as React.CSSProperties & { '--scroll-progress': number }}
      >
        <div className="horizontal-slide-container">
          <div 
            className="horizontal-slide-image"
            style={{
              '--scroll-progress': sectionProgress
            } as React.CSSProperties & { '--scroll-progress': number }}
          >
            <img src="/aboutslidee.jpg" alt="Delhi House Café ambiance" />
          </div>
        </div>
      </section>
      
      {/* THE EXPERIENCE Section */}
      <div className="reveal-section">
        <motion.section 
          ref={experienceSectionRef}
          className="experience-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          <motion.div className="experience-container" variants={staggerContainerVariants}>
          {/* First subsection - Image left, text right */}
          <motion.div 
            className="experience-subsection" 
            variants={staggerContainerVariants}
          >
            <motion.div 
              ref={restaurantImageRef}
              className="experience-image"
              variants={slideInFromLeftVariants}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ 
                scale: restaurantImageScale,
                transformOrigin: "center"
              }}
            >
              <img src="/ab1.jpg" alt="Restaurant ambiance" />
            </motion.div>
            <motion.div 
              className="experience-content"
              variants={slideInFromRightVariants}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h3 
                className="experience-subheading" 
                variants={textRevealVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <VanishingText threshold={0.35} staggerDelay={20}>
                  OUR BEGINNING
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={textRevealVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {splitTextIntoWords("Delhi House was born in Manchester in 2020, a family-run venture owned by the Lamba family, who made the journey from Delhi to the UK with a dream to share the city they love. We brought with us not just recipes and traditions from Delhi, but the very spirit of the city itself.")}
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Second subsection - Text left, image right */}
          <motion.div 
            className="experience-subsection" 
            variants={staggerContainerVariants}
          >
            <motion.div 
              className="experience-content"
              variants={slideInFromLeftVariants}
            >
              <motion.h3 
                className="experience-subheading" 
                variants={textRevealVariants}
              >
                <VanishingText threshold={0.35} staggerDelay={20}>
                  THE CITY WE LOVE
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={textRevealVariants}
              >
                {splitTextIntoWords("Delhi is a world in constant motion—a city that overwhelms, excites, and thrills. Its stories linger in the congested by-lanes, whisper through its old neighbourhoods, hum in the rhythm of its bustling suburbia, and rise with each turn of its never-ending evolution. Hidden in plain sight, these tales are waiting for those who pay attention.")}
              </motion.p>
            </motion.div>
            <motion.div 
              ref={foodImageRef}
              className="experience-image"
              variants={slideInFromRightVariants}
              style={{ 
                scale: foodImageScale,
                transformOrigin: "center"
              }}
            >
              <img src="/ab2.jpg" alt="Delicious Indian cuisine" />
            </motion.div>
          </motion.div>
          
          {/* Third subsection - Image left, text right */}
          <motion.div 
            className="experience-subsection" 
            variants={staggerContainerVariants}
          >
            <motion.div 
              className="experience-image"
              variants={slideInFromLeftVariants}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img src="/ab3.jpg" alt="Delhi House experience" />
            </motion.div>
            <motion.div 
              className="experience-content"
              variants={slideInFromRightVariants}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h3 
                className="experience-subheading" 
                variants={textRevealVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <VanishingText threshold={0.35} staggerDelay={20}>
                  SHARING THE ESSENCE
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={textRevealVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {splitTextIntoWords("Delhi House is our way of bottling that essence and sharing it here in Manchester & Liverpool. Each plate, each glass, each corner is inspired by the stories and flavours of the capital: complex, surprising, layered, and deeply memorable.")}
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Fourth subsection - Text left, image right */}
          <motion.div 
            className="experience-subsection" 
            variants={staggerContainerVariants}
          >
            <motion.div 
              className="experience-content"
              variants={slideInFromLeftVariants}
            >
              <motion.h3 
                className="experience-subheading" 
                variants={textRevealVariants}
              >
                <VanishingText threshold={0.35} staggerDelay={20}>
                  STORIES TO BE TOLD
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={textRevealVariants}
              >
                {splitTextIntoWords("Here, food and drink are more than what you taste—they are stories to be told. Let us pour you a tale, stir a poem, muddle a memory, and transport you to the sights, sounds, and flavours of our beloved city - DELHI.")}
              </motion.p>
            </motion.div>
            <motion.div 
              className="experience-image"
              variants={slideInFromRightVariants}
            >
              <img src="/ab4.jpg" alt="Delhi flavours and stories" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      </div>
      
      {/* VISIT US Section */}
      <section className="visit-us-section">
        <div className="visit-us-container">
          <h2 className="visit-us-heading">VISIT US</h2>
          
          <div className="visit-us-content">
            {/* Left side - Contact Info */}
            <div className="visit-us-info">
              {/* Phone Section */}
              <div className="info-group">
                <h3 className="info-heading">PHONE:</h3>
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="contact-detail">+44 161 834 3333</p>
                </div>
                <div className="info-item">
                  <h4 className="location-name">LIVERPOOL</h4>
                  <p className="contact-detail">+44 151 708 7416</p>
                </div>
              </div>

              {/* Hours Section */}
              <div className="info-group">
                <h3 className="info-heading">HOURS:</h3>
                
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="hours-detail">Monday - Thursday: 12–9:30 pm</p>
                  <p className="hours-detail">Friday - Saturday: 12–10 pm</p>
                  <p className="hours-detail">Sunday: 12–9:30 pm</p>
                </div>
                
                <div className="info-item">
                  <h4 className="location-name">LIVERPOOL</h4>
                  <p className="hours-detail">Monday - Thursday: 12–9:30 pm</p>
                  <p className="hours-detail">Friday - Saturday: 12–10 pm</p>
                  <p className="hours-detail">Sunday: 12–9:30 pm</p>
                </div>
              </div>

              {/* Location Section */}
              <div className="info-group">
                <h3 className="info-heading">LOCATION:</h3>
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="address">Unit 10 Exchange Sq, Manchester M4 3TR, United Kingdom</p>
                </div>
                <div className="info-item">
                  <h4 className="location-name">LIVERPOOL</h4>
                  <p className="address">Unit 2b, Britannia Pavilion, Royal Albert Docks, Liverpool L3 4AD, United Kingdom</p>
                </div>
              </div>

              {/* Nearest Landmark Section */}
              <div className="info-group">
                <h3 className="info-heading">NEAREST LANDMARK</h3>
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="landmark">Corn Exchange Manchester</p>
                </div>
                <div className="info-item">
                  <h4 className="location-name">LIVERPOOL</h4>
                  <p className="landmark">Royal Albert Dock</p>
                </div>
              </div>
            </div>

            {/* Right side - Google Maps */}
            <div className="visit-us-map">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.123456789!2d-2.2436!3d53.4848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1c0a0a0a0a0%3A0x0!2sUnit%2010%20Exchange%20Sq%2C%20Manchester%20M4%203TR%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{border: 0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Delhi House Café Manchester Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
    </main>
  );
}

