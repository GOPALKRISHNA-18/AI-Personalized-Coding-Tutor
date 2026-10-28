import api from './api';

export const analyzeCodeErrors = async (code, language) => {
  const res = await api.post('/ai/errors', { code, language });
  return res.data;
};

export const explainStepByStep = async (title, code, language) => {
  const res = await api.post('/ai/explain', { title, code, language });
  return res.data;
};

export const getAiChatReply = async (userMessage) => {
  const res = await api.post('/ai/chat', { message: userMessage });
  return res.data.reply;
};

export const generateAiExercise = async (language, skillLevel) => {
  const res = await api.post('/ai/generate-exercise', { language, skillLevel });
  return res.data;
};