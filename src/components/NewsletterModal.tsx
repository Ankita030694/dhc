'use client';

import React, { useState, useEffect } from 'react';

const OPENTABLE_NEWSLETTER_URL = 'https://www.opentable.co.uk/widget/comms/mural?rid=369630&lang=en-GB';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    const handleOpen = () => {
      setIsIframeLoading(true);
      setIsOpen(true);
    };

    window.addEventListener('open-dhc-newsletter', handleOpen);
    return () => {
      window.removeEventListener('open-dhc-newsletter', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="reservation-popup-overlay" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      <div 
        className="reservation-popup-content newsletter-popup-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="reservation-popup-header">
          <div className="flex items-center gap-3">
            <i className="fas fa-envelope-open-text text-amber-400 text-xl"></i>
            <h2 id="newsletter-popup-title">Newsletter Subscription</h2>
          </div>
          <button 
            className="reservation-popup-close" 
            onClick={handleClose}
            aria-label="Close newsletter popup"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="reservation-widget-container">
          {isIframeLoading && (
            <div className="reservation-iframe-loader">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading Delhi House Newsletter...</p>
            </div>
          )}
          <iframe 
            src={OPENTABLE_NEWSLETTER_URL}
            width="100%"
            height="500"
            frameBorder="0"
            title="OpenTable Newsletter Subscription Widget"
            allow="payment; camera; microphone; geolocation"
            referrerPolicy="no-referrer-when-downgrade"
            id="opentable-newsletter-iframe"
            onLoad={() => setIsIframeLoading(false)}
          />
        </div>

        <div className="reservation-popup-footer">
          <p>
            Having trouble viewing?{' '}
            <a 
              href={OPENTABLE_NEWSLETTER_URL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Subscribe directly on OpenTable <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', marginLeft: '2px' }}></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

