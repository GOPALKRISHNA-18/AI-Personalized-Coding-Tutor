import api from './api';
import { getCurrentUser } from './authService';
import { setItem } from '../utils/storage';

export const getLearnerProfile = async (userId) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);

  try {
    const res = await api.get(`/profiles/${idToFind}`);
    if (res.data) {
      localStorage.setItem(`profile_${idToFind}`, JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    console.warn('Backend profile fetch failed, using local profile fallback:', err?.message);
  }

  const cached = localStorage.getItem(`profile_${idToFind}`);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  const defaultProfile = {
    id: 1,
    userId: idToFind,
    preferred_language: user?.preferredLanguage || 'Python',
    skill_level: 'Intermediate',
    goal: user?.goal || 'Master Full-Stack Programming & Algorithms',
    joined_date: new Date().toISOString().split('T')[0],
  };
  localStorage.setItem(`profile_${idToFind}`, JSON.stringify(defaultProfile));
  return defaultProfile;
};

export const updateLearnerProfile = async (profileData) => {
  const user = getCurrentUser();
  const userId = profileData.user_id || profileData.userId || (user ? user.id : 1);
  const payload = {
    ...profileData,
    userId,
    preferredLanguage: profileData.preferred_language || profileData.preferredLanguage,
    skillLevel: profileData.skill_level || profileData.skillLevel,
    goal: profileData.goal,
  };

  let result = null;
  try {
    const res = await api.put('/profiles', payload);
    result = res.data;
  } catch (err) {
    console.warn('Backend updateProfile failed, falling back locally:', err?.message);
    result = {
      ...payload,
      id: profileData.id || 1,
      preferred_language: payload.preferredLanguage,
      skill_level: payload.skillLevel,
      goal: payload.goal,
      joined_date: profileData.joined_date || new Date().toISOString().split('T')[0],
    };
  }

  localStorage.setItem(`profile_${userId}`, JSON.stringify(result));
  return result;
};

export const updateUserName = async (userId, name) => {
  const user = getCurrentUser();
  const targetId = userId || (user ? user.id : 1);

  try {
    await api.put(`/profiles/user/${targetId}`, { name });
  } catch (err) {
    console.warn('Backend updateUserName failed, updating local state only:', err?.message);
  }

  if (user) {
    const updatedUser = { ...user, name };
    setItem('current_user', updatedUser);
    return updatedUser;
  }
  return null;
};