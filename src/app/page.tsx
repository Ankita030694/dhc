'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import VanishingText from '../components/VanishingText';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  
  // Refs for experience section animations
  const experienceSectionRef = useRef<HTMLElement>(null);
  const restaurantImageRef = useRef<HTMLDivElement>(null);
  const foodImageRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based transforms for image zoom
  const { scrollYProgress } = useScroll({
    target: experienceSectionRef,
    offset: ["start center", "end center"]
  });
  
  // Transform scroll progress to scale values (1.0 to 1.2, then stop at 1.2)
  // Start zooming only when the section is visible
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
  
  // Animation variants for experience section elements
  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };
  
  const staggerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate progress specifically for the semi-circle section
      // Get the fruit section element to calculate when semicircle should start
      const fruitSection = document.querySelector('.fruit-section') as HTMLElement;
      const semicircleSection = document.querySelector('.semicircle-reveal-section') as HTMLElement;
      
      if (fruitSection && semicircleSection) {
        // Start expanding when we reach the semicircle section
        const sectionStart = fruitSection.offsetTop + fruitSection.offsetHeight - window.innerHeight * 0.8;
        const sectionHeight = window.innerHeight * 1.2; // Make expansion take longer
        const progress = Math.max(0, Math.min(1, (currentScrollY - sectionStart) / sectionHeight));
        setSectionProgress(progress);
        
        // Debug logging (remove in production)
        if (currentScrollY > sectionStart - 100) {
          console.log('Scroll Progress:', progress, 'ScrollY:', currentScrollY, 'Start:', sectionStart);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <Hero />
      
      {/* Fruit section with SVG and text */}
      <section className="fruit-section">
        <div className="fruit-container">
          <p className="fruit-text">
          Step into Delhi House Café, where flavours flirt, spices tease, and Delhi's soul takes the spotlight.
          </p>
        </div>
      </section>
      
      {/* Semi-circle reveal image section */}
      <section 
        className="semicircle-reveal-section"
        style={{
          '--scroll-progress': sectionProgress
        } as React.CSSProperties & { '--scroll-progress': number }}
      >
        <div className="semicircle-reveal-container">
          <div 
            className={`semicircle-reveal-image ${sectionProgress >= 0.95 ? 'fully-expanded' : ''}`}
            style={{
              '--scroll-progress': sectionProgress
            } as React.CSSProperties & { '--scroll-progress': number }}
          >
            <img src="/img1.jpg" alt="Delhi House Café ambiance" />
          </div>
        </div>
      </section>
      
      {/* THE EXPERIENCE Section */}
      <motion.section 
        ref={experienceSectionRef}
        className="experience-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerVariants}
      >
        <motion.div className="experience-container" variants={staggerContainerVariants}>
          <motion.h2 
            className="experience-heading" 
            variants={fadeInUpVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <VanishingText threshold={0.4} staggerDelay={30}>
              THE EXPERIENCE
            </VanishingText>
          </motion.h2>
          <motion.p 
            className="experience-intro" 
            variants={fadeInUpVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <VanishingText threshold={0.3} staggerDelay={20}>
              Delhi House Café is more than just a restaurant; it's a journey through Delhi's vibrant streets, connecting you with the soulful essence of Indian flavours.
            </VanishingText>
          </motion.p>
          
          {/* First subsection - Image left, text right */}
          <motion.div 
            className="experience-subsection" 
            variants={fadeInUpVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <motion.div 
              ref={restaurantImageRef}
              className="experience-image"
              style={{ 
                scale: restaurantImageScale,
                transformOrigin: "center"
              }}
            >
              <img src="/restaurant.jpg" alt="Restaurant ambiance" />
            </motion.div>
            <motion.div 
              className="experience-content"
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <motion.h3 
                className="experience-subheading" 
                variants={fadeInUpVariants}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              >
                <VanishingText threshold={0.35} staggerDelay={25}>
                  THE RESTAURANT
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={fadeInUpVariants}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
              >
                <VanishingText threshold={0.3} staggerDelay={15}>
                  Delhi House Café is where tradition meets modern dining. From the narrow streets of Delhi to the heart of Manchester, it offers a soulful culinary journey with a creative twist on classic Indian flavours. The vibrant ambiance, crafted cocktails, and heartfelt hospitality make it a place to savour moments and create memories.
                </VanishingText>
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Second subsection - Text left, image right */}
          <motion.div 
            className="experience-subsection" 
            variants={fadeInUpVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          >
            <motion.div 
              className="experience-content"
              variants={fadeInUpVariants}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
            >
              <motion.h3 
                className="experience-subheading" 
                variants={fadeInUpVariants}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
              >
                <VanishingText threshold={0.35} staggerDelay={25}>
                  FOOD
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={fadeInUpVariants}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
              >
                <VanishingText threshold={0.3} staggerDelay={15}>
                  Our food celebrates the bold, vibrant flavours of India with a modern twist. Each dish is crafted using fresh, locally sourced ingredients, blending tradition and innovation to create a memorable dining experience. From comforting classics to unique signature creations, every bite is designed to delight your senses.
                </VanishingText>
              </motion.p>
            </motion.div>
            <motion.div 
              ref={foodImageRef}
              className="experience-image"
              style={{ 
                scale: foodImageScale,
                transformOrigin: "center"
              }}
            >
              <img src="/food.jpg" alt="Delicious Indian cuisine" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Images & Video Section */}
      <section className="pasta-lab-section mx-20">
        <h1 className="pasta-lab-heading">THE LAB</h1>
        <div className="pasta-lab-container">
          {/* Video left, image right */}
          <div className="pasta-lab-images">
            <div className="pasta-lab-image">
              <video
                src="/hero/evohero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="pasta-lab-video"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
              />
            </div>
            <div className="pasta-lab-image">
              <img src="/img2.jpg" alt="Image 2" />
            </div>
          </div>
        </div>
      </section>
      
      {/* NEWS & MORE Section */}
      <section className="news-section">
        <div className="news-container">
          <h2 className="news-heading">NEWS & MORE</h2>
          
          <div className="news-grid">
            {/* EVOO Gurgaon */}
            <div className="news-item">
              <div className="news-image">
                <img src="/restaurant.jpg" alt="EVOO Gurgaon restaurant interior" />
              </div>
              <div className="news-content">
                <h3 className="news-title">EVOO Gurgaon</h3>
                <p className="news-text">
                  We look forward to welcoming you into the new space and continue to serve you with the same passion that has always fueled our kitchen.
                </p>
              </div>
            </div>
            
            {/* Condé Nast Traveller India */}
            <div className="news-item">
              <div className="news-image">
                <img src="/restaurant.jpg" alt="Fresh pizza with burrata and arugula" />
              </div>
              <div className="news-content">
                <h3 className="news-title">Condé Nast Traveller India</h3>
                <p className="news-text">
                  Despite its small size, EVOO ensures a memorable dining experience with attentive service and high-quality seasonal ingredients sourced directly from local farmers.
                </p>
              </div>
            </div>
            
            {/* Times Food And Night Life */}
            <div className="news-item">
              <div className="news-image">
                <img src="/restaurant.jpg" alt="Times Food Awards team celebration" />
              </div>
              <div className="news-content">
                <h3 className="news-title">Times Food And Night Life</h3>
                <p className="news-text">
                  We are absolutely thrilled to announce that we have won the prestigious Times Food and Nightlife Award 2024 for BEST PIZZA (Delhi).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
              </div>

              {/* Location Section */}
              <div className="info-group">
                <h3 className="info-heading">LOCATION:</h3>
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="address">Unit 10 Exchange Sq, Manchester M4 3TR, United Kingdom</p>
                </div>
              </div>

              {/* Nearest Landmark Section */}
              <div className="info-group">
                <h3 className="info-heading">NEAREST LANDMARK</h3>
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="landmark">Corn Exchange Manchester</p>
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
                  title="EVOO Pizzeria Manchester Location"
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