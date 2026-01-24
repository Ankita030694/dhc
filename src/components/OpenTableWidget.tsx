'use client';

import { useEffect, useRef, useState } from 'react';

interface OpenTableWidgetProps {
  restaurantIds: string | string[];
}

export default function OpenTableWidget({ restaurantIds }: OpenTableWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadWidget = () => {
      try {
        // Convert restaurantIds to array format
        const idsArray = Array.isArray(restaurantIds) ? restaurantIds : [restaurantIds];
        const idsString = idsArray.join('-');
        
        // Create a unique container ID
        const containerId = `ot-widget-container-${idsString}`;
        
        if (widgetRef.current) {
          // Set the container ID
          widgetRef.current.id = containerId;
          
          // Clear any existing content except loading message
          const existingScript = document.getElementById(`ot-script-${idsString}`);
          if (existingScript) {
            existingScript.remove();
          }

          // Create script element
          const script = document.createElement('script');
          script.id = `ot-script-${idsString}`;
          script.type = 'text/javascript';
          script.async = true;
          
          // Build the URL with multiple restaurant IDs
          const ridParams = idsArray.map(id => `rid=${id}`).join('&');
          const widgetType = idsArray.length > 1 ? 'multi' : 'standard';
          
          // Use HTTPS instead of protocol-relative URL
          script.src = `https://www.opentable.co.uk/widget/reservation/loader?rid=227751&rid=369630&type=multi&theme=standard&color=1&dark=false&iframe=true&domain=couk&lang=en-GB&newtab=false&ot_source=Restaurant%20website&cfe=true`;
          
          script.onload = () => {
            console.log('OpenTable widget loaded successfully');
            setIsLoading(false);
            setHasError(false);
          };
          
          script.onerror = (error) => {
            console.error('OpenTable widget failed to load:', error);
            setIsLoading(false);
            setHasError(true);
          };

          // Add script to document head
          document.head.appendChild(script);

          // Set a timeout to handle cases where the widget doesn't load
          const timeout = setTimeout(() => {
            if (isLoading) {
              console.warn('OpenTable widget loading timeout');
              setIsLoading(false);
              setHasError(true);
            }
          }, 10000); // 10 second timeout

          return () => {
            clearTimeout(timeout);
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          };
        }
      } catch (error) {
        console.error('Error setting up OpenTable widget:', error);
        setIsLoading(false);
        setHasError(true);
      }
    };

    loadWidget();
  }, [restaurantIds, isLoading]);

  if (hasError) {
    return (
      <div className="opentable-widget-container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '490px',
          background: 'var(--neutral-gray-100)',
          borderRadius: '8px',
          border: '2px dashed var(--neutral-gray-300)',
          color: 'var(--neutral-gray-600)',
          textAlign: 'center' as const,
          flexDirection: 'column' as const,
          gap: '1rem'
        }}>
          <div>
            <i className="fas fa-exclamation-triangle" style={{ color: 'var(--secondary-yellow)', fontSize: '2rem' }}></i>
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--neutral-gray-700)' }}>
              Widget Temporarily Unavailable
            </h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>
              Please try refreshing the page or contact the restaurant directly to make a reservation.
            </p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              style={{
                background: 'var(--primary-green)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              <i className="fas fa-refresh fa-icon"></i>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="opentable-widget-container">
      <div ref={widgetRef} style={{ width: '100%', minHeight: '490px' }}>
        {isLoading && (
          <div className="widget-loading">
            <div className="loading-message">
              <i className="fas fa-spinner fa-spin fa-icon"></i>
              Loading OpenTable reservation system...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
