'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import VanishingText from '../components/VanishingText';

// Helper function to split text into word spans
const splitTextIntoWords = (text: string) => {
  return text.split(' ').map((word, index, array) => (
    <span key={index} className="reveal-word">
      {word}
      {index < array.length - 1 && ' '}
    </span>
  ));
};

export default function Home() {
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
      
      // Get the fruit section element to calculate when slide should start
      const fruitSection = document.querySelector('.fruit-section') as HTMLElement;
      
      if (fruitSection) {
        // Calculate animation trigger points
        const sectionStart = fruitSection.offsetTop - window.innerHeight;
        const sectionEnd = fruitSection.offsetTop + fruitSection.offsetHeight;
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

        // Calculate progress based on how much of the tall .reveal-section has been scrolled past.
        // Progress starts when the top of the section is at the top of the viewport (rect.top <= 0).
        // The total scrollable distance is the section's height minus the viewport's height.
        const scrollableDistance = sectionHeight - viewportHeight;
        
        // As we scroll down, rect.top becomes negative. We use this to calculate progress.
        const progress = Math.max(0, Math.min(1, (-rect.top) / scrollableDistance));
        
        // Update word opacity based on progress
        const wordElements = section.querySelectorAll('.reveal-word');
        wordElements.forEach((wordEl, wordIndex) => {
          const element = wordEl as HTMLElement;
          const totalWords = wordElements.length;
          
          // Map the overall section progress to individual word progress.
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
      <Hero />
      
      {/* Fruit section with SVG and text */}
      <section className="fruit-section">
        <div className="fruit-container">
          <p className="fruit-text">
          Step into Delhi House Café, where flavours flirt, spices tease, and Delhi's soul takes the spotlight.
          </p>
        </div>
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
            <img src="/img1.jpg" alt="Delhi House Café ambiance" />
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
            <motion.h2 
              className="experience-heading" 
              variants={fadeInUpVariants}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              THE EXPERIENCE
            </motion.h2>
            <motion.p 
              className="experience-intro" 
              variants={textRevealVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {splitTextIntoWords("Delhi House Café is more than just a restaurant; it's a journey through Delhi's vibrant streets, connecting you with the soulful essence of Indian flavours.")}
            </motion.p>
          
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
              <img src="/restaurant.jpg" alt="Restaurant ambiance" />
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
                  THE RESTAURANT
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={textRevealVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {splitTextIntoWords("Delhi House Café is where tradition meets modern dining. From the narrow streets of Delhi to the heart of Manchester, it offers a soulful culinary journey with a creative twist on classic Indian flavours. The vibrant ambiance, crafted cocktails, and heartfelt hospitality make it a place to savour moments and create memories.")}
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
                  FOOD
                </VanishingText>
              </motion.h3>
              <motion.p 
                className="experience-text" 
                variants={textRevealVariants}
              >
                {splitTextIntoWords("Our food celebrates the bold, vibrant flavours of India with a modern twist. Each dish is crafted using fresh, locally sourced ingredients, blending tradition and innovation to create a memorable dining experience. From comforting classics to unique signature creations, every bite is designed to delight your senses.")}
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
              <img src="/food.jpg" alt="Delicious Indian cuisine" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      </div>
      
      {/* Images & Video Section */}
      <section className="pasta-lab-section mx-20">
        <h1 className="pasta-lab-heading">THE PATIALA HOUSE</h1>
        <div className="pasta-lab-container">
          {/* Video left, image right */}
          <div className="pasta-lab-images">
            <div className="pasta-lab-image">
              <video
                src="/labvid.mp4"
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
            {/* Lorem Ipsum Article 1 */}
            <div className="news-item">
              <div className="news-image">
                <img src="/restaurant.jpg" alt="Lorem ipsum restaurant interior" />
              </div>
              <div className="news-content">
                <h3 className="news-title">Lorem Ipsum Dolor</h3>
                <p className="news-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            
            {/* Lorem Ipsum Article 2 */}
            <div className="news-item">
              <div className="news-image">
                <img src="/restaurant.jpg" alt="Lorem ipsum cuisine display" />
              </div>
              <div className="news-content">
                <h3 className="news-title">Ut Enim Ad Minim</h3>
                <p className="news-text">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.
                </p>
              </div>
            </div>
            
            {/* Lorem Ipsum Article 3 */}
            <div className="news-item">
              <div className="news-image">
                <img src="/restaurant.jpg" alt="Lorem ipsum dining experience" />
              </div>
              <div className="news-content">
                <h3 className="news-title">Sed Ut Perspiciatis</h3>
                <p className="news-text">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.
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