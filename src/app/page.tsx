import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Fruit section with SVG and text */}
      <section className="fruit-section">
        <div className="fruit-container">
          <div className="fruit-svg">
            <img src="/hero/fruit.svg" alt="Fruit illustration" />
          </div>
          <p className="fruit-text">
            Step into EVOO, where every dish whispers the timeless secrets of authentic Italian artistry.
          </p>
        </div>
      </section>
      
      {/* THE EXPERIENCE Section */}
      <section className="experience-section">
        <div className="experience-container">
          <h2 className="experience-heading">THE EXPERIENCE</h2>
          <p className="experience-intro">
            EVOO is more than just a dining destination; it's a culinary journey that connects you with the soulful essence of Italian cooking.
          </p>
          
          {/* First subsection - Image left, text right */}
          <div className="experience-subsection">
            <div className="experience-image">
              <img src="/hero/fruit.svg" alt="Restaurant ambiance" />
            </div>
            <div className="experience-content">
              <h3 className="experience-subheading">THE RESTAURANT</h3>
              <p className="experience-text">
                Feel the warmth and charm of our space, perfect for cherished moments with family, romantic evenings, and solo culinary adventures.
              </p>
            </div>
          </div>
          
          {/* Second subsection - Image right, text left */}
          <div className="experience-subsection reverse">
            <div className="experience-content">
              <h3 className="experience-subheading">THE RESTAURANT</h3>
              <p className="experience-text">
                Feel the warmth and charm of our space, perfect for cherished moments with family, romantic evenings, and solo culinary adventures.
              </p>
            </div>
            <div className="experience-image">
              <img src="/hero/fruit.svg" alt="Restaurant ambiance" />
            </div>
          </div>
        </div>
      </section>
      
      {/* THE PASTA LAB Section */}
      <section className="pasta-lab-section">
        <div className="pasta-lab-container">
          <h2 className="pasta-lab-heading">THE PASTA LAB</h2>
          <p className="pasta-lab-text">
            The pasta lab at EVOO is a hub of creativity where culinary imagination knows no bounds. From the elegant ribbon like strands of fettucine to the comforting pockets of caramelle ravioli we love creating pasta where every shape is a symphony of flavour and texture.
          </p>
          
          {/* Two images side by side */}
          <div className="pasta-lab-images">
            <div className="pasta-lab-image">
              <img src="/hero/fruit.svg" alt="Pasta creation process" />
            </div>
            <div className="pasta-lab-image">
              <img src="/hero/fruit.svg" alt="Fresh pasta varieties" />
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
                <img src="/hero/fruit.svg" alt="EVOO Gurgaon restaurant interior" />
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
                <img src="/hero/fruit.svg" alt="Fresh pizza with burrata and arugula" />
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
                <img src="/hero/fruit.svg" alt="Times Food Awards team celebration" />
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
                  <h4 className="location-name">DELHI</h4>
                  <p className="contact-detail">+ 91 83684 28737</p>
                </div>
                <div className="info-item">
                  <h4 className="location-name">GURGAON</h4>
                  <p className="contact-detail">+91 99992 33403</p>
                </div>
              </div>

              {/* Hours Section */}
              <div className="info-group">
                <h3 className="info-heading">HOURS:</h3>
                <p className="general-hours">Monday - Sunday</p>
                
                <div className="info-item">
                  <h4 className="location-name">DELHI</h4>
                  <p className="hours-detail">12:00 Noon - 10:30 PM</p>
                  <p className="hours-detail">Last Order - 10:25 PM</p>
                </div>
                
                <div className="info-item">
                  <h4 className="location-name">GURGAON</h4>
                  <p className="hours-detail">12:00 Noon - 11:00 PM</p>
                  <p className="hours-detail">Last Order - 10:45 PM</p>
                </div>
              </div>
            </div>

            {/* Right side - Google Maps */}
            <div className="visit-us-map">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224567.72857751175!2d76.84140695273435!3d28.527252799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03259db9e4a1%3A0xbbf8b3e1bb26b7e3!2sEVOO%20Pizzeria!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{border: 0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EVOO Pizzeria Locations"
                />
              </div>
            </div>
          </div>

          {/* Bottom section - Locations and Landmarks */}
          <div className="visit-us-bottom">
            {/* Locations Section */}
            <div className="info-group">
              <h3 className="info-heading">LOCATIONS:</h3>
              <div className="info-item">
                <h4 className="location-name">DELHI</h4>
                <p className="address">B-2, Ground Floor, Shivalik, New Delhi - 110017, India</p>
              </div>
              <div className="info-item">
                <h4 className="location-name">GURGAON</h4>
                <p className="address">The Kitchens, UNIT No 7, Ground Floor, TOWER-A, Global Gateway Towers, Mehrauli-Gurgaon Rd, Sikanderpur, Sector 26, Gurugram, Haryana 122002</p>
              </div>
            </div>

            {/* Nearest Landmark Section */}
            <div className="info-group">
              <h3 className="info-heading">NEAREST LANDMARK</h3>
              <div className="info-item">
                <h4 className="location-name">DELHI</h4>
                <p className="landmark">Aurobindo College / Malviya Nagar Metro Station</p>
              </div>
              <div className="info-item">
                <h4 className="location-name">GURGAON</h4>
                <p className="landmark">Guru Dronacharya Metro Station</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
    </main>
  );
}