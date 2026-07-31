'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, getDocs, deleteDoc, doc, Timestamp, getDoc, setDoc } from 'firebase/firestore';

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Timestamp | null;
}

import { useLenis } from '../../context/LenisContext';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isGiftCardsEnabled, setIsGiftCardsEnabled] = useState<boolean>(true);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const router = useRouter();
  
  // Safe access to Lenis context in case it's not provided (though it should be)
  let lenisContext;
  try {
    lenisContext = useLenis();
  } catch (e) {
    lenisContext = { lenis: null };
  }
  const { lenis } = lenisContext;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchSubmissions();
        fetchStoreConfig();
        setLoading(false);
      } else {
        router.push('/login');
        // Keep loading true while redirecting
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedSubmission) {
      document.body.style.overflow = 'hidden';
      // We don't lock documentElement here as it might conflict with Lenis
      // We also don't stop Lenis, as we want nested scrolling to work
      // Instead we use data-lenis-prevent on the scrollable container
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSubmission]);

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, 'form'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: FormSubmission[] = [];
      
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        } as FormSubmission);
      });
      
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchStoreConfig = async () => {
    try {
      const configDoc = await getDoc(doc(db, 'settings', 'storeConfig'));
      if (configDoc.exists()) {
        const data = configDoc.data();
        if (data.isGiftCardsEnabled !== undefined) {
          setIsGiftCardsEnabled(data.isGiftCardsEnabled);
        }
      } else {
        // Create it if it doesn't exist
        await setDoc(doc(db, 'settings', 'storeConfig'), { isGiftCardsEnabled: true });
        setIsGiftCardsEnabled(true);
      }
    } catch (error) {
      console.error('Error fetching store config:', error);
    }
  };

  const handleToggleGiftCards = async () => {
    setIsUpdatingSettings(true);
    const newValue = !isGiftCardsEnabled;
    try {
      await setDoc(doc(db, 'settings', 'storeConfig'), { isGiftCardsEnabled: newValue }, { merge: true });
      setIsGiftCardsEnabled(newValue);
    } catch (error) {
      console.error('Error updating store config:', error);
      alert('Failed to update gift card settings.');
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    setIsDeleting(id);
    try {
      await deleteDoc(doc(db, 'form', id));
      setSubmissions(submissions.filter(sub => sub.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-left">
            <h1 className="dashboard-title">
              <i className="fas fa-chart-line"></i>
              Dashboard
            </h1>
            <p className="dashboard-subtitle">Contact Form Submissions</p>
          </div>
          <div className="dashboard-header-right">
            <span className="dashboard-user">
              <i className="fas fa-user-circle"></i>
              {user?.email}
            </span>
            <button onClick={handleLogout} className="dashboard-logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <motion.div 
          className="dashboard-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <i className="fas fa-envelope stat-icon"></i>
          <div className="stat-content">
            <h3 className="stat-number">{submissions.length}</h3>
            <p className="stat-label">Total Submissions</p>
          </div>
        </motion.div>

        <motion.div 
          className="dashboard-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <i className="fas fa-clock stat-icon"></i>
          <div className="stat-content">
            <h3 className="stat-number">
              {submissions.filter(s => {
                if (!s.timestamp) return false;
                const dayAgo = new Date();
                dayAgo.setDate(dayAgo.getDate() - 1);
                return s.timestamp.toDate() > dayAgo;
              }).length}
            </h3>
            <p className="stat-label">Last 24 Hours</p>
          </div>
        </motion.div>

        <motion.div 
          className="dashboard-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <i className="fas fa-check-circle stat-icon"></i>
          <div className="stat-content">
            <h3 className="stat-number">
              {submissions.filter(s => {
                if (!s.timestamp) return false;
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return s.timestamp.toDate() > weekAgo;
              }).length}
            </h3>
            <p className="stat-label">This Week</p>
          </div>
        </motion.div>

        <motion.div 
          className="dashboard-stat-card"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-content" style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <p className="stat-label" style={{ margin: 0 }}>Gift Cards Status</p>
              <i className="fas fa-gift stat-icon" style={{ fontSize: '1.5rem', marginBottom: 0 }}></i>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isGiftCardsEnabled ? '#10b981' : '#ef4444' }}>
                {isGiftCardsEnabled ? 'Active' : 'Disabled'}
              </span>
              
              <button 
                onClick={handleToggleGiftCards}
                disabled={isUpdatingSettings}
                style={{ 
                  backgroundColor: isGiftCardsEnabled ? '#ef4444' : '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: isUpdatingSettings ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  opacity: isUpdatingSettings ? 0.7 : 1,
                  transition: 'background-color 0.2s'
                }}
              >
                {isUpdatingSettings ? 'Updating...' : (isGiftCardsEnabled ? 'Disable' : 'Enable')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Submissions List */}
      <div className="dashboard-content">
        <motion.div 
          className="submissions-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="submissions-header">
            <h2 className="submissions-title">
              <i className="fas fa-list"></i>
              All Submissions
            </h2>
            <button 
              onClick={fetchSubmissions}
              className="refresh-btn"
            >
              <i className="fas fa-sync-alt"></i>
              Refresh
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="no-submissions">
              <i className="fas fa-inbox"></i>
              <p>No submissions yet</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {submissions.map((submission, index) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.03 }}
                        className="table-row"
                      >
                        <td className="date-cell">
                          {formatDate(submission.timestamp)}
                        </td>
                        <td className="name-cell">
                          {submission.name}
                        </td>
                        <td className="phone-cell">
                          <a href={`tel:${submission.phone}`}>
                            {submission.phone}
                          </a>
                        </td>
                        <td className="email-cell">
                          <a href={`mailto:${submission.email}`}>
                            {submission.email}
                          </a>
                        </td>
                        <td className="message-cell">
                          <div className="message-preview">
                            {submission.message.substring(0, 80)}
                            {submission.message.length > 80 ? '...' : ''}
                          </div>
                        </td>
                        <td className="actions-cell">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="view-btn"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(submission.id)}
                            className="delete-btn-table"
                            disabled={isDeleting === submission.id}
                            title="Delete"
                          >
                            {isDeleting === submission.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fas fa-trash"></i>
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSubmission(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">
                  <i className="fas fa-file-alt"></i>
                  Submission Details
                </h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="modal-close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="modal-body" data-lenis-prevent>
                <div className="modal-field">
                  <label className="modal-label">
                    <i className="fas fa-user"></i>
                    Name
                  </label>
                  <p className="modal-value">{selectedSubmission.name}</p>
                </div>

                <div className="modal-field">
                  <label className="modal-label">
                    <i className="fas fa-envelope"></i>
                    Email
                  </label>
                  <p className="modal-value">
                    <a href={`mailto:${selectedSubmission.email}`}>
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>

                <div className="modal-field">
                  <label className="modal-label">
                    <i className="fas fa-phone"></i>
                    Phone
                  </label>
                  <p className="modal-value">
                    <a href={`tel:${selectedSubmission.phone}`}>
                      {selectedSubmission.phone}
                    </a>
                  </p>
                </div>

                <div className="modal-field">
                  <label className="modal-label">
                    <i className="fas fa-calendar"></i>
                    Date & Time
                  </label>
                  <p className="modal-value">{formatDate(selectedSubmission.timestamp)}</p>
                </div>

                <div className="modal-field">
                  <label className="modal-label">
                    <i className="fas fa-comment"></i>
                    Message
                  </label>
                  <p className="modal-value modal-message">{selectedSubmission.message}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => {
                    handleDelete(selectedSubmission.id);
                    setSelectedSubmission(null);
                  }}
                  className="modal-delete-btn"
                  disabled={isDeleting === selectedSubmission.id}
                >
                  <i className="fas fa-trash"></i>
                  Delete Submission
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

