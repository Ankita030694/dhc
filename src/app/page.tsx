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
              <img src="/restaurant.jpg" alt="Restaurant ambiance" />
            </div>
            <div className="experience-content">
              <h3 className="experience-subheading">THE RESTAURANT</h3>
              <p className="experience-text">
                Delhi House Café is where tradition meets modern dining. From the narrow streets of Delhi to the heart of Manchester, it offers a soulful culinary journey with a creative twist on classic Indian flavours. The vibrant ambiance, crafted cocktails, and heartfelt hospitality make it a place to savour moments and create memories.
              </p>
            </div>
          </div>
          
          {/* Second subsection - Text left, image right */}
          <div className="experience-subsection">
            <div className="experience-content">
              <h3 className="experience-subheading">FOOD</h3>
              <p className="experience-text">
                Our food celebrates the bold, vibrant flavours of India with a modern twist. Each dish is crafted using fresh, locally sourced ingredients, blending tradition and innovation to create a memorable dining experience. From comforting classics to unique signature creations, every bite is designed to delight your senses.
              </p>
            </div>
            <div className="experience-image">
              <img src="/food.jpg" alt="Delicious Indian cuisine" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Images Section */}
      <section className="pasta-lab-section">
        <div className="pasta-lab-container">
          {/* Two images side by side */}
          <div className="pasta-lab-images">
            <div className="pasta-lab-image">
              <img src="/img1.jpg" alt="Image 1" />
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
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="contact-detail">+44 161 834 3333</p>
                </div>
              </div>

              {/* Hours Section */}
              <div className="info-group">
                <h3 className="info-heading">HOURS:</h3>
                
                <div className="info-item">
                  <h4 className="location-name">MANCHESTER</h4>
                  <p className="hours-detail">Monday: 12–9:30 pm</p>
                  <p className="hours-detail">Tuesday: 12–9:30 pm</p>
                  <p className="hours-detail">Wednesday: 12–9:30 pm</p>
                  <p className="hours-detail">Thursday: 12–9:30 pm</p>
                  <p className="hours-detail">Friday: 12–10 pm</p>
                  <p className="hours-detail">Saturday: 12–10 pm</p>
                  <p className="hours-detail">Sunday: 12–9:30 pm</p>
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

          {/* Bottom section - Location and Landmark */}
          <div className="visit-us-bottom">
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
        </div>
      </section>
      
      <Footer />
      
    </main>
  );
}