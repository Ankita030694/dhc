import BookingForm from '../components/BookingForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Restaurant Header */}
      <header className="restaurant-header">
        <div className="container mx-auto">
          <h1 className="restaurant-title">
            <i className="fas fa-utensils fa-icon"></i>
            Delhi House Cafe Manchester
          </h1>
          <p className="restaurant-location">
            <i className="fas fa-map-marker-alt fa-icon"></i>
            Manchester, UK
          </p>
          <div className="restaurant-id">
            <small style={{ opacity: 0.8 }}>Restaurant ID: #227751</small>
          </div>
        </div>
      </header>

      {/* OpenTable Widget Section */}
      <section className="widget-container">
        <div className="widget-wrapper">
          <div className="widget-header" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <h2 style={{ 
              color: 'var(--primary-green)', 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              <i className="fas fa-calendar-check fa-icon"></i>
              Make a Reservation
            </h2>
            <p style={{ 
              color: 'var(--neutral-gray-600)', 
              fontSize: '1rem',
              margin: 0 
            }}>
              Book your table at Delhi House Cafe Manchester
            </p>
          </div>
          
          {/* Embedded Booking Form */}
          <BookingForm 
            restaurantId="227751" 
            restaurantName="Delhi House Cafe Manchester"
          />
        </div>
      </section>

      {/* Additional Information */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto', 
        padding: '0 1rem',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'var(--accent-light-yellow-pale)',
          border: '2px solid var(--secondary-yellow)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            color: 'var(--secondary-yellow-dark)', 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            <i className="fas fa-bell fa-icon"></i>
            Widget Features
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>
                <i className="fas fa-cog fa-icon"></i>
                Widget Settings
              </h4>
              <ul style={{ color: 'var(--neutral-gray-700)', fontSize: '0.9rem' }}>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>Tall format (288 x 490 pixels)</li>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>English-GB language</li>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>iFrame protection enabled</li>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>New tab opens after search</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>
                <i className="fas fa-star fa-icon"></i>
                Features
              </h4>
              <ul style={{ color: 'var(--neutral-gray-700)', fontSize: '0.9rem' }}>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>'Notify me' button available</li>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>Affiliated restaurant marketing</li>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>Real-time availability</li>
                <li><i className="fas fa-check fa-icon" style={{ fontSize: '0.8rem' }}></i>Secure reservation system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
