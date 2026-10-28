import api from './api';
import { getCurrentUser } from './authService';
import { assessmentQuestions } from '../data/assessmentData';

export const getQuestions = (language) => {
  return assessmentQuestions[language] || assessmentQuestions.Python;
};

export const getAssessments = async (userId) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  try {
    const res = await api.get(`/assessments/user/${idToFind}`);
    return res.data;
  } catch (err) {
    console.warn('Backend /assessments unavailable:', err?.message);
    return [];
  }
};

export const submitAssessment = async (language, score) => {
  const user = getCurrentUser();
  const userId = user ? user.id : 1;
  try {
    const res = await api.post('/assessments', {
      userId,
      language,
      score
    });
    return res.data;
  } catch (err) {
    console.warn('Backend submitAssessment failed, saving locally:', err?.message);
    const localResult = { userId, language, score, timestamp: new Date().toISOString() };
    localStorage.setItem(`assessment_${userId}`, JSON.stringify(localResult));
    return localResult;
  }
};