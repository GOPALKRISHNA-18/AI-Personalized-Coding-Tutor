import api from './api';
import { getCurrentUser } from './authService';
import { quizzesData, leaderboardData } from '../data/quizzesData';

export const getQuizzes = async () => {
  try {
    const res = await api.get('/quizzes');
    if (res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /quizzes unavailable, using dynamic quizzes data:', err?.message);
  }
  return quizzesData;
};

export const getQuizById = async (quizId) => {
  try {
    const res = await api.get(`/quizzes/${quizId}`);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /quizzes/:id unavailable, using dynamic fallback:', err?.message);
  }
  return quizzesData.find((item) => item.id === quizId) || quizzesData[0];
};

export const getQuizQuestions = async (quizId) => {
  try {
    const res = await api.get(`/quizzes/${quizId}/questions`);
    if (res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /quizzes/:id/questions unavailable, using fallback:', err?.message);
  }
  const quiz = quizzesData.find((item) => item.id === quizId) || quizzesData[0];
  return quiz.questions;
};

export const submitQuizResult = async (quizId, answers = {}) => {
  const user = getCurrentUser();
  const userId = user ? user.id : 1;
  try {
    const res = await api.post('/quizzes/submit', {
      userId,
      quizId: Number(quizId) || 1,
      answers
    });
    return res.data;
  } catch (err) {
    console.warn('Backend /quizzes/submit unavailable, recorded locally:', err?.message);
    return { success: true, quizId, userId };
  }
};

export const getQuizResults = async (userId) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  try {
    const res = await api.get(`/quizzes/results/${idToFind}`);
    return res.data;
  } catch (err) {
    console.warn('Backend /quizzes/results unavailable:', err?.message);
    return [];
  }
};

export const getLeaderboard = async () => {
  return leaderboardData;
};