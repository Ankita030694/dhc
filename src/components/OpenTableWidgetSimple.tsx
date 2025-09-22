'use client';

import { useEffect } from 'react';

interface OpenTableWidgetSimpleProps {
  restaurantId: string;
}

export default function OpenTableWidgetSimple({ restaurantId }: OpenTableWidgetSimpleProps) {
  useEffect(() => {
    // Log to console to verify the component is mounting
    console.log('OpenTableWidgetSimple mounted with restaurant ID:', restaurantId);
  }, [restaurantId]);

  // Direct HTML embedding approach
  const scriptHTML = `
    <script type='text/javascript' src='https://www.opentable.co.uk/widget/reservation/loader?rid=${restaurantId}&type=standard&theme=tall&color=1&dark=false&iframe=true&domain=couk&lang=en-GB&newtab=true&ot_source=Restaurant%20website&cfe=true'></script>
  `;

  return (
    <div className="opentable-widget-simple">
      <div 
        style={{
          width: '100%',
          minHeight: '490px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--neutral-gray-50)',
          borderRadius: '8px',
          border: '1px solid var(--neutral-gray-200)',
          position: 'relative'
        }}
      >
        {/* Fallback content */}
        <div style={{ textAlign: 'center', color: 'var(--neutral-gray-600)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <i className="fas fa-calendar-alt" style={{ fontSize: '2rem', color: 'var(--primary-green)' }}></i>
          </div>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary-green)' }}>
            OpenTable Reservations
          </h3>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
            Restaurant ID: #{restaurantId}
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--neutral-gray-500)' }}>
            <p>If the reservation widget doesn't appear, you can:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
              <li>• Visit OpenTable.co.uk directly</li>
              <li>• Search for "Delhi House Cafe Manchester"</li>
              <li>• Call the restaurant directly</li>
            </ul>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <a 
              href={`https://www.opentable.co.uk/restref/client/?rid=${restaurantId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'var(--primary-green)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              <i className="fas fa-external-link-alt fa-icon"></i>
              Book on OpenTable
            </a>
          </div>
        </div>
        
        {/* Hidden div where the script will try to inject the widget */}
        <div 
          id={`ot-widget-${restaurantId}`}
          dangerouslySetInnerHTML={{ __html: scriptHTML }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

