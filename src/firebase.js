// src/firebase.js - Fixed Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Debug environment variables
console.log('🔍 Firebase Environment Variables Check:');
const envVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check each environment variable
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}:`, value ? '✅ Set' : '❌ Missing');
  if (value) {
    console.log(`  Value: ${key === 'apiKey' ? value.substring(0, 10) + '...' : value}`);
  }
});

// Firebase configuration
const firebaseConfig = {
  apiKey: envVars.apiKey,
  authDomain: envVars.authDomain,
  projectId: envVars.projectId,
  storageBucket: envVars.storageBucket,
  messagingSenderId: envVars.messagingSenderId,
  appId: envVars.appId,
  measurementId: envVars.measurementId,
};

// Validate required fields
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('❌ Missing Firebase configuration fields:', missingFields);
  console.error('Please check your .env file and make sure all VITE_FIREBASE_* variables are set');
  throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
}

console.log('🔧 Firebase Config Validation: ✅ All required fields present');

let app, analytics, auth;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');
  
  // Initialize Auth first (most important for your use case)
  auth = getAuth(app);
  console.log('✅ Firebase Auth initialized successfully');
  
  // Initialize Analytics only if supported
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('✅ Firebase Analytics initialized');
    } else {
      console.warn('⚠️ Analytics not supported in this environment');
    }
  }).catch((error) => {
    console.warn('⚠️ Analytics initialization failed:', error.message);
  });

} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Error details:', error.message);
  throw error; // Re-throw to prevent app from running with broken Firebase
}

// Configure Google Provider with better error handling
let googleProvider, githubProvider;

try {
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('profile');
  googleProvider.addScope('email');
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  console.log('✅ Google Auth provider configured');
} catch (error) {
  console.error('❌ Google provider setup failed:', error);
}

try {
  githubProvider = new GithubAuthProvider();
  githubProvider.addScope('user:email');
  githubProvider.addScope('read:user');
  githubProvider.setCustomParameters({
    allow_signup: 'true'
  });
  console.log('✅ GitHub Auth provider configured');
} catch (error) {
  console.error('❌ GitHub provider setup failed:', error);
}

// Export with error checking
if (!auth) {
  console.error('❌ Auth not initialized - check Firebase setup');
}

export { auth, googleProvider, githubProvider, app, analytics };