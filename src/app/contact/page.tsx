'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '../../components/Footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <main>
      {/* Contact Us Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-image-container">
          <Image 
            src="/food.jpg" 
            alt="Delhi House Café - Contact Us" 
            fill
            priority
            style={{ objectFit: 'cover' }}
            quality={90}
          />
          <div className="contact-hero-overlay"></div>
        </div>
        
        <motion.div 
          className="contact-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="contact-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            CONTACT US
          </motion.h1>
          <motion.div 
            className="contact-hero-divider"
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
          <motion.p 
            className="contact-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Get in Touch - We'd Love to Hear from You
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <motion.div 
            className="contact-form-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="contact-form-heading">Send us a Message</h2>
            <p className="contact-form-description">
              Have a question, feedback, or want to make a reservation? We're here to help. 
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell us about your inquiry, feedback, or reservation request..."
                  rows={6}
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="contact-submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-paper-plane"></i>
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="contact-visit-section">
        <div className="contact-visit-container">
          <motion.h2 
            className="contact-visit-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Visit Us
          </motion.h2>
          
          <div className="contact-visit-content">
            {/* Left side - Contact Info */}
            <motion.div 
              className="contact-visit-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Phone Section */}
              <div className="contact-info-group">
                <h3 className="contact-info-heading">
                  Phone
                </h3>
                <div className="contact-info-item">
                  <h4 className="contact-location-name">MANCHESTER</h4>
                  <p className="contact-detail">+44 161 834 3333</p>
                </div>
                <div className="contact-info-item">
                  <h4 className="contact-location-name">LIVERPOOL</h4>
                  <p className="contact-detail">+44 151 708 7416</p>
                </div>
              </div>

              {/* Hours Section */}
              <div className="contact-info-group">
                <h3 className="contact-info-heading">
                  Hours
                </h3>
                
                <div className="contact-info-item">
                  <h4 className="contact-location-name">MANCHESTER</h4>
                  <p className="contact-hours-detail">Monday - Thursday: 12–9:30 pm</p>
                  <p className="contact-hours-detail">Friday - Saturday: 12–10 pm</p>
                  <p className="contact-hours-detail">Sunday: 12–9:30 pm</p>
                </div>
                
                <div className="contact-info-item">
                  <h4 className="contact-location-name">LIVERPOOL</h4>
                  <p className="contact-hours-detail">Monday - Thursday: 12–9:30 pm</p>
                  <p className="contact-hours-detail">Friday - Saturday: 12–10 pm</p>
                  <p className="contact-hours-detail">Sunday: 12–9:30 pm</p>
                </div>
              </div>

              {/* Location Section */}
              <div className="contact-info-group">
                <h3 className="contact-info-heading">
                  Location
                </h3>
                <div className="contact-info-item">
                  <h4 className="contact-location-name">MANCHESTER</h4>
                  <p className="contact-address">Unit 10 Exchange Sq, Manchester M4 3TR, United Kingdom</p>
                </div>
                <div className="contact-info-item">
                  <h4 className="contact-location-name">LIVERPOOL</h4>
                  <p className="contact-address">Unit 2b, Britannia Pavilion, Royal Albert Docks, Liverpool L3 4AD, United Kingdom</p>
                </div>
              </div>

              {/* Email Section */}
              <div className="contact-info-group">
                <h3 className="contact-info-heading">
                  Email
                </h3>
                <div className="contact-info-item">
                  <p className="contact-email">info@delhihousecafe.co.uk</p>
                </div>
              </div>
            </motion.div>

            {/* Right side - Google Maps */}
            <motion.div 
              className="contact-visit-map"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="contact-map-container">
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
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
