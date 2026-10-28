import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = () => {
  const key = firebaseConfig.apiKey;
  return Boolean(
    key &&
    key.trim() !== '' &&
    !key.includes('your_api_key_here') &&
    !key.includes('YOUR_')
  );
};

let app;
let auth;
let googleProvider;

try {
  const activeConfig = isFirebaseConfigured()
    ? firebaseConfig
    : {
        apiKey: 'AIzaSyDummyPlaceholderKeyForInitOnly12345',
        authDomain: 'ai-personalized-coding-tutor.firebaseapp.com',
        projectId: 'ai-personalized-coding-tutor',
        storageBucket: 'ai-personalized-coding-tutor.firebasestorage.app',
        messagingSenderId: '1234567890',
        appId: '1:1234567890:web:abcdef123456',
      };

  app = !getApps().length ? initializeApp(activeConfig) : getApp();
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
} catch (e) {
  console.warn('Firebase initialization warning:', e);
}

const translateFirebaseError = (err) => {
  let message = err.message || 'Failed to sign in with Google';

  switch (err.code) {
    case 'auth/popup-closed-by-user':
      message = 'Sign-in cancelled: The Google popup was closed.';
      break;
    case 'auth/popup-blocked':
      message = 'Popup blocked: Please allow popups for localhost in your browser address bar.';
      break;
    case 'auth/cancelled-popup-request':
      message = 'Only one Google sign-in window can be open at a time.';
      break;
    case 'auth/unauthorized-domain':
      message = 'Domain not authorized: Please add localhost to Authorized Domains in Firebase Console.';
      break;
    case 'auth/operation-not-allowed':
      message = 'Google Sign-In is not enabled in Firebase Console (Authentication > Sign-in method).';
      break;
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid':
      message = 'Invalid Firebase API Key. Please verify your VITE_FIREBASE_API_KEY in frontend/.env.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error while connecting to Firebase. Check your internet connection.';
      break;
    default:
      break;
  }

  const enhancedError = new Error(message);
  enhancedError.code = err.code;
  enhancedError.originalError = err;
  return enhancedError;
};

export const signInWithGooglePopup = async () => {
  if (!isFirebaseConfigured()) {
    const error = new Error(
      'Firebase is not yet configured. Please add your Firebase credentials in frontend/.env'
    );
    error.code = 'FIREBASE_NOT_CONFIGURED';
    throw error;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    throw translateFirebaseError(err);
  }
};

export const signInWithGoogleRedirect = async () => {
  if (!isFirebaseConfigured()) {
    const error = new Error(
      'Firebase is not yet configured. Please add your Firebase credentials in frontend/.env'
    );
    error.code = 'FIREBASE_NOT_CONFIGURED';
    throw error;
  }

  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (err) {
    throw translateFirebaseError(err);
  }
};

export const getGoogleRedirectResult = async () => {
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    return result ? result.user : null;
  } catch (err) {
    throw translateFirebaseError(err);
  }
};

export const logoutFirebase = async () => {
  if (auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Firebase signOut error:', err);
    }
  }
};

export { app, auth, googleProvider };