import api from './api';

export const getHintsByExerciseId = async (exerciseId) => {
  const res = await api.get(`/hints/exercise/${exerciseId}`);
  return res.data;
};

export const getHintByLevel = async (exerciseId, level) => {
  const res = await api.get(`/hints/${exerciseId}/${level}`);
  return res.data;
};