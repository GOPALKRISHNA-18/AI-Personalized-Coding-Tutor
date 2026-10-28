export const initialSummaryStats = [
  { id: 'exercises', label: 'Exercises Completed', value: '1', subtext: '1 challenge solved', iconName: 'CheckCircle2', color: '#10b981' },
  { id: 'streak', label: 'Current Streak', value: '1 Day', subtext: 'Active consistency', iconName: 'Flame', color: '#f59e0b' },
  { id: 'quizzes', label: 'Quizzes Taken', value: '1', subtext: 'Baseline quiz', iconName: 'Award', color: '#6366f1' },
  { id: 'score', label: 'Average Score', value: '85%', subtext: 'Initial evaluation', iconName: 'TrendingUp', color: '#06b6d4' }
];

export const initialCourses = [
  { language: 'Python', percentage: 5, modules: '1 / 20 Modules', color: '#3572A5' },
  { language: 'Java', percentage: 0, modules: '0 / 20 Modules', color: '#b07219' },
  { language: 'JavaScript', percentage: 0, modules: '0 / 20 Modules', color: '#f1e05a' },
  { language: 'C', percentage: 0, modules: '0 / 20 Modules', color: '#555555' }
];

export const initialTopicSkills = [
  { topic: 'Arrays & Hashing', level: 'Beginner', score: 10 },
  { topic: 'Strings', level: 'Beginner', score: 0 },
  { topic: 'Linked List', level: 'Beginner', score: 0 },
  { topic: 'Stack', level: 'Beginner', score: 0 },
  { topic: 'Dynamic Programming', level: 'Beginner', score: 0 },
  { topic: 'Pointers & Memory', level: 'Beginner', score: 0 }
];

export const defaultRecommended = {
  id: 2,
  title: 'Valid Parentheses with Monotonic Stack',
  description: 'Given a string containing just the characters brackets, determine if the input string is valid.',
  difficulty: 'Easy',
  topic: 'Stack • Python',
  estimatedTime: '15 mins'
};

export const difficultyData = [
  { level: 'Easy', solved: 1, total: 4, color: '#10b981' },
  { level: 'Medium', solved: 0, total: 3, color: '#f59e0b' },
  { level: 'Hard', solved: 0, total: 1, color: '#ef4444' }
];

export const topicProgressData = [
  { topic: 'Arrays & Hashing', solved: 1, total: 10, pct: 10 },
  { topic: 'Strings', solved: 0, total: 10, pct: 0 },
  { topic: 'Two Pointers', solved: 0, total: 10, pct: 0 },
  { topic: 'Dynamic Programming', solved: 0, total: 10, pct: 0 },
  { topic: 'Trees & Binary Search Trees', solved: 0, total: 10, pct: 0 },
  { topic: 'Linked List', solved: 0, total: 10, pct: 0 },
  { topic: 'Binary Search', solved: 0, total: 10, pct: 0 },
  { topic: 'Graph Algorithms', solved: 0, total: 10, pct: 0 }
];

export const badgesData = [
  {
    id: 'badge-1',
    title: 'Day 1 Streak',
    year: '2026',
    unlocked: true,
    desc: 'Started your daily coding journey and solved your first problem.',
    icon: '🔥'
  },
  {
    id: 'badge-2',
    title: 'Top Solver',
    year: '2026',
    unlocked: false,
    desc: 'Solve 50+ problems across multiple algorithms.',
    icon: '⚡'
  },
  {
    id: 'badge-3',
    title: 'DP Specialist',
    year: '2026',
    unlocked: false,
    desc: 'Solve 25+ advanced dynamic programming challenges.',
    icon: '🧩'
  },
  {
    id: 'badge-4',
    title: '100 Days Badge',
    year: '2026',
    unlocked: false,
    desc: 'Solve at least one challenge every day for 100 consecutive days.',
    icon: '🛡️'
  },
  {
    id: 'badge-5',
    title: 'Knight Rating',
    year: '2026',
    unlocked: false,
    desc: 'Attain contest rating greater than 1,850 points.',
    icon: '⚔️'
  },
  {
    id: 'badge-6',
    title: 'Guardian Tier',
    year: '2026',
    unlocked: false,
    desc: 'Reach top 1% global rating threshold of 2,200 points.',
    icon: '👑'
  }
];

export const ratingHistoryData = [
  { month: 'Jan', rating: 1200 },
  { month: 'Feb', rating: 1200 },
  { month: 'Mar', rating: 1200 },
  { month: 'Apr', rating: 1200 },
  { month: 'May', rating: 1200 },
  { month: 'Jun', rating: 1200 }
];