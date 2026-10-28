import api from './api';
import { getCurrentUser } from './authService';
import {
  initialSummaryStats,
  initialCourses,
  initialTopicSkills,
  difficultyData,
  topicProgressData,
  badgesData,
  ratingHistoryData
} from '../data/statsData';
import { initialActivities } from '../data/activityData';

export const getProgress = async (userId) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  try {
    const res = await api.get(`/progress/${idToFind}`);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend getProgress failed, using dynamic progress:', err?.message);
  }
  return {
    userId: idToFind,
    totalSolved: 1,
    totalQuestions: 16,
    accuracy: 85,
    streak: 1,
    difficultyStats: difficultyData,
    topicProgress: topicProgressData
  };
};

export const updateProgress = async () => {
  return null;
};

export const getDashboardStats = async (userId) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  try {
    const res = await api.get(`/dashboard/${idToFind}`);
    if (res.data) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend getDashboardStats failed, using dynamic stats:', err?.message);
  }
  return {
    completedChallenges: 1,
    streak: 1,
    quizzesTaken: 1,
    averageScore: 85,
    summaryStats: initialSummaryStats,
    courses: initialCourses,
    topicSkills: initialTopicSkills
  };
};

export const getDifficultyStats = () => difficultyData;

export const getTopicProgress = () => topicProgressData;

export const getBadges = () => badgesData;

export const getRatingHistory = () => ratingHistoryData;

export const getActivities = () => initialActivities;