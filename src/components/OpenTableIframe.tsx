'use client';

interface OpenTableIframeProps {
  restaurantId: string;
}

export default function OpenTableIframe({ restaurantId }: OpenTableIframeProps) {
  // Create the OpenTable URL for direct iframe embedding
  const openTableUrl = `https://www.opentable.co.uk/widget/reservation/loader?rid=${restaurantId}&type=standard&theme=tall&color=1&dark=false&iframe=true&domain=couk&lang=en-GB&newtab=true&ot_source=Restaurant%20website&cfe=true`;

  return (
    <div className="opentable-iframe-container" style={{ width: '100%', minHeight: '490px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column' as const, 
        gap: '1rem',
        alignItems: 'center'
      }}>
        {/* Method 1: Try direct iframe */}
        <div style={{ 
          width: '100%', 
          maxWidth: '400px',
          border: '2px solid var(--accent-light-green)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--neutral-white)'
        }}>
          <div style={{
            background: 'var(--primary-green)',
            color: 'white',
            padding: '0.75rem',
            textAlign: 'center' as const,
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            <i className="fas fa-calendar-check fa-icon"></i>
            OpenTable Reservation Widget
          </div>
          
          <div style={{ padding: '1rem', textAlign: 'center' as const }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--neutral-gray-600)' }}>
              Loading reservation system for Delhi House Cafe Manchester...
            </p>
            
            {/* Attempt 1: Direct script injection */}
            <div 
              id={`opentable-widget-${restaurantId}`}
              style={{ minHeight: '400px', position: 'relative' }}
            >
              <script 
                type="text/javascript" 
                src={openTableUrl}
                async
              />
              
              {/* Loading indicator */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'var(--neutral-gray-500)'
              }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem', color: 'var(--primary-green)' }}></i>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Loading...</div>
              </div>
            </div>
            
            {/* Fallback link */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--neutral-gray-200)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--neutral-gray-500)', margin: '0 0 0.5rem 0' }}>
                Having trouble? Book directly:
              </p>
              <a 
                href={`https://www.opentable.co.uk/restref/client/?rid=${restaurantId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: 'var(--primary-green)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                <i className="fas fa-external-link-alt fa-icon"></i>
                Open OpenTable
              </a>
            </div>
          </div>
        </div>

        {/* Method 2: Alternative approach with direct OpenTable link */}
        <div style={{
          background: 'var(--accent-light-yellow-pale)',
          border: '1px solid var(--secondary-yellow)',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center' as const,
          maxWidth: '400px',
          width: '100%'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary-yellow-dark)' }}>
            <i className="fas fa-info-circle fa-icon"></i>
            Alternative Booking Method
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--neutral-gray-700)', margin: '0 0 1rem 0' }}>
            If the widget above doesn't load, you can book directly through OpenTable:
          </p>
          <a 
            href={`https://www.opentable.co.uk/restref/client/?rid=${restaurantId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'var(--secondary-yellow)',
              color: 'var(--neutral-gray-900)',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}
          >
            <i className="fas fa-utensils fa-icon"></i>
            Book at Delhi House Cafe
          </a>
        </div>
      </div>
    </div>
  );
}

