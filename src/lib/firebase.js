// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHBRCxM4tYdAU9DYpPEyHZLFLXtOJneYc",
  authDomain: "delhihousecafe-94aea.firebaseapp.com",
  projectId: "delhihousecafe-94aea",
  storageBucket: "delhihousecafe-94aea.firebasestorage.app",
  messagingSenderId: "1013450707427",
  appId: "1:1013450707427:web:465047df333a2f205bd0d6",
  measurementId: "G-H69FNJXXN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth, analytics };