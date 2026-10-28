import api from './api';
import { getCurrentUser } from './authService';

export const getSubmissions = async (userId) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  const res = await api.get(`/submissions/user/${idToFind}`);
  return res.data;
};

export const runCode = async (code, language) => {
  const res = await api.post('/submissions/run', { code, language });
  return res.data;
};

export const submitCode = async (exerciseId, code, language) => {
  const user = getCurrentUser();
  const userId = user ? user.id : 1;
  const res = await api.post('/submissions', {
    userId,
    exerciseId: Number(exerciseId),
    code,
    language,
  });
  return res.data;
};