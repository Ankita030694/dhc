'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '../../components/Footer';

export default function ProductDetail() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    sender: '',
    recipient: ''
  });

  // Gift Card Products
  const products = [
    {
      id: 1,
      name: '£25 Gift Card - Delhi House Cafe',
      image: '/giftcards/1.png',
      thumbnailImage: '/giftcards/2.png',
      price: 25.00,
      originalPrice: 30.00,
      inStock: true,
      brand: 'Delhi House Cafe',
      description: 'Perfect for a starter or appetizer treat at Delhi House Cafe. This £25 gift card offers access to our delicious menu of authentic Indian cuisine crafted with the finest ingredients.',
      features: [
        'Valid at all Delhi House Cafe locations',
        'Expiration date 1 year from purchase',
        'Cannot be combined with other offers',
        'Perfect for appetizers and starters',
        'Instant digital delivery available',
        'Customizable message option',
      ],
    },
    {
      id: 2,
      name: '£50 Gift Card - Delhi House Cafe',
      image: '/giftcards/3.png',
      thumbnailImage: '/giftcards/4.png',
      price: 50.00,
      originalPrice: 60.00,
      inStock: true,
      brand: 'Delhi House Cafe',
      description: 'Treat yourself or someone special to an unforgettable dining experience at Delhi House Cafe. Our £50 gift card offers access to authentic Indian cuisine crafted with the finest ingredients and traditional recipes.',
      features: [
        'Valid at all Delhi House Cafe locations',
        'Expiration date 1 year from purchase',
        'Cannot be combined with other offers',
        'Perfect for a complete meal for two',
        'Instant digital delivery available',
        'Customizable message option',
      ],
    },
    {
      id: 3,
      name: '£100 Gift Card - Delhi House Cafe',
      image: '/giftcards/5.png',
      thumbnailImage: '/giftcards/6.png',
      price: 100.00,
      originalPrice: 120.00,
      inStock: true,
      brand: 'Delhi House Cafe',
      description: 'Experience luxury dining with our premium £100 gift card. Perfect for special occasions, celebrations, or treating a group to the finest Indian cuisine. Includes access to our full menu and premium dishes.',
      features: [
        'Valid at all Delhi House Cafe locations',
        'Expiration date 1 year from purchase',
        'Cannot be combined with other offers',
        'Perfect for group dining or celebrations',
        'Instant digital delivery available',
        'Premium gift packaging available',
      ],
    },
    {
      id: 4,
      name: '£150 Gift Card - Delhi House Cafe',
      image: '/giftcards/7.png',
      thumbnailImage: '/giftcards/8.png',
      price: 150.00,
      originalPrice: 180.00,
      inStock: true,
      brand: 'Delhi House Cafe',
      description: 'The ultimate gift of exceptional dining. Our £150 gift card provides an extraordinary culinary journey through authentic Indian flavors. Ideal for corporate gifts, anniversaries, or unforgettable family celebrations.',
      features: [
        'Valid at all Delhi House Cafe locations',
        'Expiration date 1 year from purchase',
        'Cannot be combined with other offers',
        'Exclusive VIP treatment available',
        'Instant digital delivery available',
        'Premium gift packaging with personalized message',
      ],
    },
  ];

  const product = products[selectedProduct];

  const handleBuyNowClick = () => {
    setShowEmailModal(true);
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailForm.sender || !emailForm.recipient) {
      alert('Please fill in both email fields');
      return;
    }

    // Save emails to localStorage
    localStorage.setItem('giftCardSender', emailForm.sender);
    localStorage.setItem('giftCardRecipient', emailForm.recipient);

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          price: product.price,
          productName: product.name,
        }),
      });

      const data = await response.json();
      
      // Check if the response was successful
      if (!response.ok) {
        const errorMsg = data.error || 'Failed to create checkout session';
        const details = data.details ? `\n\nDetails: ${data.details}` : '';
        throw new Error(`${errorMsg}${details}`);
      }
      
      // Validate response data
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response from server');
      }
      
      // Redirect to Stripe Checkout using the URL provided by Stripe
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsProcessing(false); // Only reset if error, otherwise we are redirecting
      
      // Provide user-friendly error message
      let errorMessage = 'There was an error processing your payment. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle network errors
        if (error.message.includes('fetch') || error.message.includes('network')) {
          errorMessage = 'Network error: Please check your internet connection and try again.';
        }
      }
      
      alert(errorMessage);
    }
  };


  return (
    <main className="product-detail-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="breadcrumb-container">
          <a href="/" className="breadcrumb-link">
            <i className="fas fa-home"></i> Home
          </a>
          <i className="fas fa-chevron-right breadcrumb-separator"></i>
          <a href="/gift-cards" className="breadcrumb-link">Gift Cards</a>
          <i className="fas fa-chevron-right breadcrumb-separator"></i>
          <span className="breadcrumb-current">Premium Gift Card</span>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="product-main-section">
        <div className="product-main-container">
          {/* Left - Image Gallery */}
          <div className="product-gallery">
            <motion.div 
              className="product-main-image"
              key={selectedProduct}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                className="main-product-img"
              />
              <div className="product-value-badge">
                £{product.price.toFixed(0)}
              </div>
            </motion.div>
            
            <div className="product-thumbnails">
              {products.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`thumbnail ${selectedProduct === index ? 'active' : ''}`}
                  onClick={() => setSelectedProduct(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={item.thumbnailImage}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="thumbnail-value">
                    £{item.price.toFixed(0)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Middle - Product Info */}
          <div className="product-info">
            <motion.div
              key={selectedProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="product-brand">{product.brand}</div>
              <h1 className="product-title">{product.name}</h1>
              
              

              <div className="product-price-section">
                <div className="price-container">
                  <span className="current-price">£{product.price.toFixed(2)}</span>
                
                </div>
              </div>

             

              <div className="product-highlights">
                <h3 className="highlights-title">
                  <i className="fas fa-sparkles"></i> Key Features
                </h3>
                <ul className="highlights-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                className="buy-now-btn-main mt-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNowClick}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-credit-card"></i>
                    Buy Now
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="product-details-section">
        <div className="product-details-container">
          <motion.div 
            className="details-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="description-content">
              <h2>About This Gift Card</h2>
              <p>{product.description}</p>
              <p>Whether you're celebrating a birthday, anniversary, or simply want to show appreciation, our gift cards provide the perfect solution. Recipients can enjoy our full menu of authentic Indian dishes, from traditional curries to contemporary fusion creations.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Gift Card Details</h2>
            <p className="text-gray-600 mb-6">Please enter the email addresses for the confirmation.</p>
            
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                <input
                  type="email"
                  required
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  placeholder="your@email.com"
                  value={emailForm.sender}
                  onChange={(e) => setEmailForm({...emailForm, sender: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Email</label>
                <input
                  type="email"
                  required
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  placeholder="recipient@email.com"
                  value={emailForm.recipient}
                  onChange={(e) => setEmailForm({...emailForm, recipient: e.target.value})}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-[#d4af37] text-white rounded-md hover:bg-[#c4a030] transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}

