// src/context/AuthContext.jsx - Fixed Version
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase';
import { toast } from 'sonner';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    console.log('🔄 Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        console.log('🔄 Auth state changed:', user ? `User: ${user.email}` : 'No user');
        setUser(user);
        setLoading(false);
        setError(null);
        
        if (user) {
          console.log('✅ User logged in:', {
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            provider: user.providerData[0]?.providerId
          });
          
          toast.success(`Welcome back, ${user.displayName || user.email}!`, {
            description: 'Successfully logged in to SCR Game',
          });
        }
      },
      (authError) => {
        console.error('❌ Auth state change error:', authError);
        setError(authError.message);
        setLoading(false);
        
        toast.error('Authentication Error', {
          description: 'There was an issue with authentication. Please try again.',
        });
      }
    );

    return () => {
      console.log('🧹 Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      console.log('🚀 Starting Google login...');
      
      // Check if auth and provider are available
      if (!auth) {
        throw new Error('Firebase Auth not initialized');
      }
      if (!googleProvider) {
        throw new Error('Google provider not configured');
      }
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Google login successful:', {
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      });
      
      toast.success('Login Successful!', {
        description: `Welcome ${result.user.displayName}! You're now logged in.`,
      });
      
      return result;
    } catch (error) {
      console.error('❌ Google login error:', error);
      setError(error.message);
      
      let errorMessage = 'Google login failed';
      let errorDescription = '';
      
      switch (error.code) {
        case 'auth/popup-blocked':
          errorMessage = 'Popup Blocked';
          errorDescription = 'Please allow popups for this site and try again.';
          break;
        case 'auth/popup-closed-by-user':
          console.log('ℹ️ User closed popup - no error shown');
          return; // Don't show error for user cancellation
        case 'auth/unauthorized-domain':
          errorMessage = 'Domain Not Authorized';
          errorDescription = `Add ${window.location.hostname} to Firebase authorized domains in console.`;
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Google Sign-in Disabled';
          errorDescription = 'Google sign-in is not enabled in Firebase Console.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network Error';
          errorDescription = 'Check your internet connection and try again.';
          break;
        case 'auth/internal-error':
          errorMessage = 'Configuration Error';
          errorDescription = 'There may be an issue with Firebase configuration.';
          break;
        case 'auth/invalid-api-key':
          errorMessage = 'Invalid API Key';
          errorDescription = 'Firebase API key is invalid or missing.';
          break;
        default:
          errorMessage = 'Login Failed';
          errorDescription = error.message || 'An unexpected error occurred during Google login.';
      }
      
      toast.error(errorMessage, {
        description: errorDescription,
      });
      
      throw error;
    }
  };

  // Login with GitHub
  const loginWithGithub = async () => {
    try {
      setError(null);
      console.log('🚀 Starting GitHub login...');
      
      // Check if auth and provider are available
      if (!auth) {
        throw new Error('Firebase Auth not initialized');
      }
      if (!githubProvider) {
        throw new Error('GitHub provider not configured');
      }
      
      const result = await signInWithPopup(auth, githubProvider);
      console.log('✅ GitHub login successful:', {
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      });
      
      toast.success('Login Successful!', {
        description: `Welcome ${result.user.displayName || result.user.email}! You're now logged in.`,
      });
      
      return result;
    } catch (error) {
      console.error('❌ GitHub login error:', error);
      setError(error.message);
      
      let errorMessage = 'GitHub login failed';
      let errorDescription = '';
      
      switch (error.code) {
        case 'auth/popup-blocked':
          errorMessage = 'Popup Blocked';
          errorDescription = 'Please allow popups for this site and try again.';
          break;
        case 'auth/popup-closed-by-user':
          console.log('ℹ️ User closed popup - no error shown');
          return; // Don't show error for user cancellation
        case 'auth/unauthorized-domain':
          errorMessage = 'Domain Not Authorized';
          errorDescription = `Add ${window.location.hostname} to Firebase authorized domains.`;
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'GitHub Sign-in Disabled';
          errorDescription = 'GitHub sign-in is not enabled in Firebase Console.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Account Exists';
          errorDescription = 'An account with this email already exists. Try signing in with a different method.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network Error';
          errorDescription = 'Check your internet connection and try again.';
          break;
        default:
          errorMessage = 'Login Failed';
          errorDescription = error.message || 'An unexpected error occurred during GitHub login.';
      }
      
      toast.error(errorMessage, {
        description: errorDescription,
      });
      
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      console.log('🚀 Starting logout...');
      
      await signOut(auth);
      console.log('✅ Logout successful');
      
      toast.success('Logged Out', {
        description: 'You have been successfully logged out.',
      });
      
    } catch (error) {
      console.error('❌ Logout error:', error);
      setError(error.message);
      
      toast.error('Logout Failed', {
        description: 'Failed to logout. Please try again.',
      });
      
      throw error;
    }
  };

  // Debug function to check auth status
  const debugAuth = () => {
    console.log('🔍 Auth Debug Info:', {
      auth: !!auth,
      googleProvider: !!googleProvider,
      githubProvider: !!githubProvider,
      user: user ? {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid
      } : null,
      loading,
      error
    });
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithGithub,
    logout,
    debugAuth, // Useful for debugging
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};