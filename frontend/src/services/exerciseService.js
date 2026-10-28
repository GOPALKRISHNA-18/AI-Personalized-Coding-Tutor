import api from './api';
import { exercisesData } from '../data/exercisesData';

export const getExercises = async (filters = {}) => {
  try {
    const res = await api.get('/exercises', { params: filters });
    if (res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /exercises unavailable, using dynamic exercises data:', err?.message);
  }
  let list = [...exercisesData];
  if (filters.difficulty && filters.difficulty !== 'All') {
    list = list.filter((item) => item.difficulty === filters.difficulty);
  }
  if (filters.topic && filters.topic !== 'All') {
    list = list.filter((item) => item.topic === filters.topic);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((item) => item.title.toLowerCase().includes(q) || item.topic.toLowerCase().includes(q));
  }
  return list;
};

export const getExerciseById = async (id) => {
  try {
    const res = await api.get(`/exercises/${id}`);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /exercises/:id unavailable, using dynamic exercise fallback:', err?.message);
  }
  return exercisesData.find((item) => item.id === Number(id)) || exercisesData[0];
};

export const createExercise = async (data) => {
  const res = await api.post('/exercises', data);
  return res.data;
};

export const getRecommendedExercises = async (userId) => {
  try {
    const res = await api.get(`/exercises/recommended/${userId}`);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /exercises/recommended unavailable, using dynamic fallback:', err?.message);
  }
  return exercisesData.slice(0, 3);
};