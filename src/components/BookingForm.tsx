'use client';

import { useState } from 'react';

interface BookingFormProps {
  restaurantId: string;
  restaurantName: string;
}

export default function BookingForm({ restaurantId, restaurantName }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '2',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    confirmationNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate time slots
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  // Generate party sizes
  const partySizes = Array.from({ length: 12 }, (_, i) => i + 1);

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // Get maximum date (60 days from today)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate processing the reservation directly
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Send data to your backend API
      // 2. Your backend would handle the OpenTable API integration
      // 3. Return confirmation details
      
      // For now, we'll simulate a successful booking
      setShowSuccess(true);
      
      // Generate a mock confirmation number
      const confirmationNumber = `DH${Date.now().toString().slice(-6)}`;
      
      // Store confirmation details (in real app, this would come from your API)
      setFormData(prev => ({ ...prev, confirmationNumber }));
      
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Sorry, there was an error processing your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%)',
        borderRadius: '12px',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: 'white',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <i className="fas fa-check-circle" style={{ fontSize: '4rem', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.8rem' }}>
            Reservation Confirmed!
          </h3>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
            Your table has been successfully reserved.
          </p>
          {formData.confirmationNumber && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              display: 'inline-block'
            }}>
              <strong style={{ fontSize: '1.1rem' }}>
                Confirmation: {formData.confirmationNumber}
              </strong>
            </div>
          )}
        </div>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: '8px', 
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Your Reservation Details:</h4>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Restaurant:</strong> {restaurantName}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-GB', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Time:</strong> {formData.time}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Party Size:</strong> {formData.partySize} {parseInt(formData.partySize) === 1 ? 'person' : 'people'}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Contact:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Email:</strong> {formData.email}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          marginTop: '2rem',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
            <i className="fas fa-info-circle fa-icon"></i>
            What's Next?
          </h4>
          <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p style={{ margin: '0.5rem 0' }}>
              <i className="fas fa-envelope fa-icon"></i>
              A confirmation email will be sent to {formData.email}
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <i className="fas fa-phone fa-icon"></i>
              The restaurant may call {formData.phone} to confirm
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <i className="fas fa-calendar-alt fa-icon"></i>
              Please arrive 15 minutes before your reservation time
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap' as const,
          justifyContent: 'center'
        }}>
          <button
            onClick={() => {
              setShowSuccess(false);
              setFormData({
                date: '',
                time: '',
                partySize: '2',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                specialRequests: '',
                confirmationNumber: ''
              });
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-plus fa-icon"></i>
            Make Another Reservation
          </button>
          
          <button
            onClick={() => window.print()}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-print fa-icon"></i>
            Print Confirmation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--neutral-white)',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '2px solid var(--accent-light-green)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ 
          color: 'var(--primary-green)', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          margin: '0 0 0.5rem 0'
        }}>
          <i className="fas fa-calendar-check fa-icon"></i>
          Make a Reservation
        </h3>
        <p style={{ 
          color: 'var(--neutral-gray-600)', 
          fontSize: '1rem',
          margin: '0 0 1.5rem 0'
        }}>
          {restaurantName}
        </p>
        
        {/* Direct OpenTable Button */}
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'var(--neutral-gray-100)',
          borderRadius: '8px',
          border: '1px solid var(--neutral-gray-200)'
        }}>
          <p style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '0.9rem', 
            color: 'var(--neutral-gray-600)' 
          }}>
            Prefer to book directly with OpenTable?
          </p>
          <a
            href={`https://www.opentable.co.uk/restref/client/?rid=${restaurantId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#dc2626', // Red color
              color: 'white',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 2px 4px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.2s',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#b91c1c';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(220, 38, 38, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(220, 38, 38, 0.3)';
            }}
          >
            <i className="fas fa-external-link-alt"></i>
            Book a Table
          </a>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '1.5rem 0',
          color: 'var(--neutral-gray-400)'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--neutral-gray-300)' }}></div>
          <span style={{ padding: '0 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--neutral-gray-300)' }}></div>
        </div>

        <p style={{ 
          color: 'var(--neutral-gray-600)', 
          fontSize: '0.9rem',
          margin: '0 0 1rem 0',
          fontWeight: 'bold'
        }}>
          Fill out our quick form below:
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Date and Time Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: 'var(--neutral-gray-700)',
              fontSize: '0.9rem'
            }}>
              <i className="fas fa-calendar fa-icon"></i>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={today}
              max={maxDateStr}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--neutral-gray-300)',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                color: 'var(--neutral-black)'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: 'var(--neutral-gray-700)',
              fontSize: '0.9rem'
            }}>
              <i className="fas fa-clock fa-icon"></i>
              Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--neutral-gray-300)',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                color: 'var(--neutral-black)'
              }}
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Party Size */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: 'var(--neutral-gray-700)',
            fontSize: '0.9rem'
          }}>
            <i className="fas fa-users fa-icon"></i>
            Party Size
          </label>
          <select
            name="partySize"
            value={formData.partySize}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--neutral-gray-300)',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          >
            {partySizes.map(size => (
              <option key={size} value={size.toString()}>
                {size} {size === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Information */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: 'var(--neutral-gray-700)',
              fontSize: '0.9rem'
            }}>
              <i className="fas fa-user fa-icon"></i>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--neutral-gray-300)',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                color: 'var(--neutral-black)'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: 'var(--neutral-gray-700)',
              fontSize: '0.9rem'
            }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--neutral-gray-300)',
                borderRadius: '6px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                color: 'var(--neutral-black)'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: 'var(--neutral-gray-700)',
            fontSize: '0.9rem'
          }}>
            <i className="fas fa-envelope fa-icon"></i>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--neutral-gray-300)',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: 'var(--neutral-gray-700)',
            fontSize: '0.9rem'
          }}>
            <i className="fas fa-phone fa-icon"></i>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--neutral-gray-300)',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: 'var(--neutral-gray-700)',
            fontSize: '0.9rem'
          }}>
            <i className="fas fa-comment fa-icon"></i>
            Special Requests (Optional)
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={3}
            placeholder="Any dietary requirements, seating preferences, or special occasions..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--neutral-gray-300)',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              resize: 'vertical',
              color: 'var(--neutral-black)'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            background: isSubmitting ? 'var(--neutral-gray-400)' : 'var(--primary-green)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Processing Reservation...
            </>
          ) : (
            <>
              <i className="fas fa-utensils"></i>
              Complete Reservation
            </>
          )}
        </button>
      </form>

      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem',
        background: 'var(--accent-light-yellow-pale)',
        borderRadius: '6px',
        fontSize: '0.85rem',
        color: 'var(--neutral-gray-700)',
        textAlign: 'center'
      }}>
        <i className="fas fa-shield-alt fa-icon"></i>
        Your reservation will be processed securely and confirmed instantly
      </div>
    </div>
  );
}
