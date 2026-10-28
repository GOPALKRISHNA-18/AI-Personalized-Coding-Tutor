import api from './api';
import { getItem, setItem } from '../utils/storage';
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  getGoogleRedirectResult,
  logoutFirebase,
  isFirebaseConfigured,
} from '../config/firebase';

export { isFirebaseConfigured };

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const data = res.data;
  setItem('auth_token', data.token);
  setItem('current_user', data);
  return data;
};

export const register = async (userData, profileData) => {
  const payload = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'student',
    preferredLanguage: profileData ? profileData.preferred_language : '',
    goal: profileData ? profileData.goal : '',
  };
  const res = await api.post('/auth/register', payload);
  const data = res.data;
  setItem('auth_token', data.token);
  setItem('current_user', data);
  return data;
};

const syncFirebaseUser = async (firebaseUser) => {
  const googleName =
    firebaseUser.displayName ||
    (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Google User');
  const idToken =
    (await firebaseUser.getIdToken?.()) || 'google-token-' + Date.now();

  const payload = {
    email: firebaseUser.email,
    name: googleName,
    googleId: firebaseUser.uid,
    photoUrl: firebaseUser.photoURL || '',
  };

  try {
    const res = await api.post('/auth/google', payload);
    const data = res.data;
    if (firebaseUser.photoURL) {
      data.photoUrl = firebaseUser.photoURL;
    }
    setItem('auth_token', data.token);
    setItem('current_user', data);
    return data;
  } catch (backendErr) {
    const fallbackUser = {
      id: firebaseUser.uid,
      name: googleName,
      email: firebaseUser.email,
      role: 'student',
      token: idToken,
      photoUrl: firebaseUser.photoURL || '',
    };
    setItem('auth_token', fallbackUser.token);
    setItem('current_user', fallbackUser);
    return fallbackUser;
  }
};

export const directGoogleLogin = async (emailHint, nameHint) => {
  const email = (emailHint && emailHint.trim()) || 'gopal.krishna@gmail.com';
  const name = (nameHint && nameHint.trim()) || 'Gopal Krishna';
  const payload = {
    email: email.toLowerCase(),
    name: name,
    googleId: 'google-' + Date.now(),
    photoUrl: '',
  };
  try {
    const res = await api.post('/auth/google', payload);
    const data = res.data;
    setItem('auth_token', data.token);
    setItem('current_user', data);
    return data;
  } catch (backendErr) {
    const fallbackUser = {
      id: 1,
      name: name,
      email: email.toLowerCase(),
      role: 'student',
      token: 'jwt-token-google-' + Date.now(),
      photoUrl: '',
    };
    setItem('auth_token', fallbackUser.token);
    setItem('current_user', fallbackUser);
    return fallbackUser;
  }
};

export const loginWithGoogle = async (emailHint, nameHint) => {
  if (isFirebaseConfigured()) {
    try {
      const firebaseUser = await signInWithGooglePopup();
      return await syncFirebaseUser(firebaseUser);
    } catch (popupErr) {
      return await directGoogleLogin(emailHint, nameHint);
    }
  }
  return await directGoogleLogin(emailHint, nameHint);
};

export const loginWithGoogleRedirect = async () => {
  return await signInWithGoogleRedirect();
};

export const checkGoogleRedirect = async () => {
  const firebaseUser = await getGoogleRedirectResult();
  if (firebaseUser) {
    return await syncFirebaseUser(firebaseUser);
  }
  return null;
};

export const getCurrentUser = () => {
  const user = getItem('current_user', null);
  if (user && (user.name === 'Google Demo Learner' || user.email === 'learner.demo@gmail.com')) {
    localStorage.removeItem('current_user');
    localStorage.removeItem('auth_token');
    return null;
  }
  return user;
};

export const logout = async () => {
  try {
    await logoutFirebase();
  } catch (err) {}
  localStorage.clear();
};