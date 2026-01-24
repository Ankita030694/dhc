'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { generateGiftCardCode } from '../../lib/giftCardUtils';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const testAmount = searchParams.get('amount'); // For development testing
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [giftCardCode, setGiftCardCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (sessionId) {
        try {
          // Fetch session details from Stripe via API
          const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
          const data = await response.json();
          
          if (response.ok && data.success) {
            const details = {
              amount: data.amount,
              productName: data.productName,
              email: data.email,
            };
            setPaymentDetails(details);
            // Generate gift card code from transaction ID
            const code = generateGiftCardCode(sessionId, details.amount);
            setGiftCardCode(code);

            // Check for stored emails and send confirmation
            const senderEmail = localStorage.getItem('giftCardSender');
            const recipientEmail = localStorage.getItem('giftCardRecipient');

            if (senderEmail && recipientEmail) {
              // Send email in background
              fetch('/api/send-gift-card-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  senderEmail,
                  recipientEmail,
                  giftCardCode: code,
                  amount: details.amount,
                  productName: details.productName,
                }),
              }).then(async (res) => {
                if (res.ok) {
                  console.log('Gift card email sent successfully');
                  // Clear only the specific items from localStorage
                  localStorage.removeItem('giftCardSender');
                  localStorage.removeItem('giftCardRecipient');
                } else {
                  console.error('Failed to send gift card email');
                }
              }).catch(err => {
                console.error('Error sending gift card email:', err);
              });
            }

          } else {
            // Fallback if API fails
            console.error('Failed to fetch session details:', data.error);
            setPaymentDetails({
              amount: 0,
              productName: 'Gift Card - Delhi House Cafe',
              email: 'customer@example.com',
            });
          }
        } catch (error) {
          console.error('Error fetching payment details:', error);
          setPaymentDetails({
            amount: 0,
            productName: 'Gift Card - Delhi House Cafe',
            email: 'customer@example.com',
          });
        } finally {
          setLoading(false);
        }
      } else if (process.env.NODE_ENV === 'development') {
        // Allow testing in development without session_id
        setTimeout(() => {
          const testTransactionId = 'cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6a7B8c9D0e1F2g3H4';
          const amount = testAmount ? parseFloat(testAmount) : 25.00;
          const productName = amount === 25 ? '£25 Gift Card - Delhi House Cafe' :
                              amount === 50 ? '£50 Gift Card - Delhi House Cafe' :
                              amount === 100 ? '£100 Gift Card - Delhi House Cafe' :
                              amount === 150 ? '£150 Gift Card - Delhi House Cafe' :
                              `£${amount} Gift Card - Delhi House Cafe`;
          const details = {
            amount: amount,
            productName: productName,
            email: 'test@example.com',
            transactionId: testTransactionId,
          };
          setPaymentDetails(details);
          // Generate gift card code from transaction ID
          const code = generateGiftCardCode(testTransactionId, details.amount);
          setGiftCardCode(code);

          // Check for stored emails and send confirmation (DEV MODE)
          const senderEmail = localStorage.getItem('giftCardSender');
          const recipientEmail = localStorage.getItem('giftCardRecipient');

          if (senderEmail && recipientEmail) {
             fetch('/api/send-gift-card-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  senderEmail,
                  recipientEmail,
                  giftCardCode: code,
                  amount: details.amount,
                  productName: details.productName,
                }),
              }).then(async (res) => {
                if (res.ok) {
                  console.log('Gift card email sent successfully (DEV)');
                  localStorage.removeItem('giftCardSender');
                  localStorage.removeItem('giftCardRecipient');
                }
              });
          }

          setLoading(false);
        }, 1000);
      } else {
        // In production without session_id, keep loading or handle error
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  const handleCopyCode = async () => {
    if (giftCardCode) {
      try {
        await navigator.clipboard.writeText(giftCardCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  if (loading || !paymentDetails) {
    return (
      <main className="payment-success-page">
        <Navbar />
        <div className="loading-container">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <i className="fas fa-spinner"></i>
          </motion.div>
          <p>Processing your payment...</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="payment-success-page">
      <Navbar />
      
      <section className="success-section">
        <div className="success-container">
          <motion.div
            className="success-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            
            <h1 className="success-title">Payment Successful!</h1>
            <p className="success-message">
              Thank you for your purchase. Your gift card has been processed successfully.
            </p>

            <div className="payment-details">
              <h2>Payment Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Product:</span>
                  <span className="detail-value">{paymentDetails?.productName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">£{paymentDetails?.amount?.toFixed(2)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{paymentDetails?.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Transaction ID:</span>
                  <span className="detail-value">{sessionId || paymentDetails?.transactionId || 'N/A'}</span>
                </div>
                <div className="detail-item detail-item-full">
                  <span className="detail-label">Gift Card Code:</span>
                  <div className="gift-card-code-container">
                    <span className="detail-value gift-card-code">
                      {giftCardCode 
                        ? (showCode ? giftCardCode : '••••••••••••••••')
                        : 'Generating...'
                      }
                    </span>
                    {giftCardCode && (
                      <div className="code-action-buttons">
                        <button
                          className="toggle-code-btn"
                          onClick={() => setShowCode(!showCode)}
                          title={showCode ? 'Hide code' : 'Show code'}
                        >
                          <i className={`fas ${showCode ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                        <button
                          className="copy-code-btn"
                          onClick={handleCopyCode}
                          title="Copy code"
                        >
                          <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="next-steps">
              <h2>What's Next?</h2>
              <ul className="steps-list">
                <li>
                  <i className="fas fa-envelope"></i>
                  You will receive a confirmation email with your gift card details
                </li>
                <li>
                  <i className="fas fa-gift"></i>
                  Your digital gift card will be available for immediate use
                </li>
               
              </ul>
            </div>

            <div className="action-buttons">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/gift-cards'}
              >
                <i className="fas fa-gift"></i>
                Buy Another Gift Card
              </motion.button>
              
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/'}
              >
                <i className="fas fa-home"></i>
                Return to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <main className="payment-success-page">
        <Navbar />
        <div className="loading-container">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <i className="fas fa-spinner"></i>
          </motion.div>
          <p>Loading...</p>
        </div>
        <Footer />
      </main>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}



