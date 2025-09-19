'use client';

import { useState, useEffect } from 'react';

interface OpenTableWidgetFixedProps {
  restaurantId: string;
}

export default function OpenTableWidgetFixed({ restaurantId }: OpenTableWidgetFixedProps) {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Set a timeout to show fallback if widget doesn't load
    const timer = setTimeout(() => {
      if (!widgetLoaded) {
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [widgetLoaded]);

  // Direct OpenTable booking URL
  const directBookingUrl = `https://www.opentable.co.uk/restref/client/?rid=${restaurantId}`;
  
  // Widget URL for iframe (if supported)
  const widgetUrl = `https://www.opentable.co.uk/widget/reservation/loader?rid=${restaurantId}&type=standard&theme=tall&color=1&dark=false&iframe=true&domain=couk&lang=en-GB&newtab=true&ot_source=Restaurant%20website&cfe=true`;

  return (
    <div className="opentable-widget-fixed">
      {!showFallback ? (
        <div style={{ position: 'relative', width: '100%', minHeight: '490px' }}>
          {/* Loading state */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--neutral-gray-100)',
              borderRadius: '8px',
              border: '2px dashed var(--accent-light-green)',
              zIndex: widgetLoaded ? -1 : 1
            }}
          >
            <div style={{ textAlign: 'center', color: 'var(--neutral-gray-600)' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-green)', marginBottom: '1rem' }}></i>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Loading OpenTable Widget...</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--neutral-gray-500)' }}>
                This may take a few moments
              </div>
            </div>
          </div>

          {/* Try to embed the widget using a different approach */}
          <div 
            id={`opentable-widget-${restaurantId}`}
            style={{ 
              width: '100%', 
              minHeight: '490px',
              position: 'relative',
              zIndex: widgetLoaded ? 1 : -1
            }}
          >
            {/* Use dangerouslySetInnerHTML to inject the script directly */}
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <div id="ot-reservation-widget-${restaurantId}" style="width: 100%; min-height: 490px;">
                    <script type='text/javascript'>
                      (function() {
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.async = true;
                        script.src = '${widgetUrl}';
        script.onload = function() {
          console.log('✅ OpenTable widget loaded successfully');
          if (window.parent && window.parent.postMessage) {
            window.parent.postMessage({ type: 'OPENTABLE_LOADED' }, '*');
          }
        };
                        script.onerror = function() {
                          console.error('OpenTable widget failed to load');
                          if (window.parent && window.parent.postMessage) {
                            window.parent.postMessage({ type: 'OPENTABLE_ERROR' }, '*');
                          }
                        };
                        document.head.appendChild(script);
                      })();
                    </script>
                  </div>
                `
              }}
            />
          </div>
        </div>
      ) : (
        // Fallback UI when widget fails to load
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
          minHeight: '490px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <i className="fas fa-utensils" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
              Make Your Reservation
            </h3>
            <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
              Delhi House Cafe Manchester
            </p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
              Restaurant ID: #{restaurantId}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <a
              href={directBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--neutral-white)',
                color: 'var(--primary-green)',
                padding: '1rem 2rem',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <i className="fas fa-calendar-check" style={{ marginRight: '0.5rem' }}></i>
              Book on OpenTable
            </a>

            <div style={{ fontSize: '0.9rem', opacity: 0.8, textAlign: 'center' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>Or call the restaurant directly:</p>
              <p style={{ margin: '0', fontWeight: 'bold' }}>
                <i className="fas fa-phone fa-icon"></i>
                Contact Delhi House Cafe
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Manual fallback trigger */}
      {!showFallback && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setShowFallback(true)}
            style={{
              background: 'transparent',
              border: '1px solid var(--neutral-gray-300)',
              color: 'var(--neutral-gray-600)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Widget not loading? Click here for booking options
          </button>
        </div>
      )}
    </div>
  );

  // Listen for messages from the widget
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OPENTABLE_LOADED') {
        setWidgetLoaded(true);
      } else if (event.data?.type === 'OPENTABLE_ERROR') {
        setShowFallback(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
}
