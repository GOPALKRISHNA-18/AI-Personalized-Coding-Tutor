import api from './api';
import { getCurrentUser } from './authService';
import { learningPathsData } from '../data/learningPathsData';

export const getRoadmaps = () => learningPathsData;

const getDefaultTopicsForLanguage = (language = 'Python', level = 'Beginner') => {
  const lang = language || 'Python';
  if (level === 'Advanced') {
    return [
      {
        id: 1,
        topic: `Advanced Data Structures & Trees in ${lang}`,
        description: 'Master AVL trees, Binary Search Trees, and Heaps with memory considerations.',
        status: 'In Progress',
        order_no: 1,
        estimated_time: '45 mins',
        exercises_count: 4,
        key_skills: ['BST', 'Heaps', 'Priority Queues']
      },
      {
        id: 2,
        topic: 'Dynamic Programming & Optimization',
        description: 'Formulate recurrence relations, memoization tables, and bottom-up DP states.',
        status: 'Locked',
        order_no: 2,
        estimated_time: '60 mins',
        exercises_count: 5,
        key_skills: ['Memoization', 'Tabulation', '0/1 Knapsack']
      },
      {
        id: 3,
        topic: 'Graph Algorithms (BFS & DFS)',
        description: 'Explore directed & undirected graphs, cycle detection, and shortest paths.',
        status: 'Locked',
        order_no: 3,
        estimated_time: '50 mins',
        exercises_count: 4,
        key_skills: ['BFS', 'DFS', 'Dijkstra']
      },
      {
        id: 4,
        topic: 'System Design & Memory Profiling',
        description: 'Understand time-space trade-offs, garbage collection, and cache efficiency.',
        status: 'Locked',
        order_no: 4,
        estimated_time: '40 mins',
        exercises_count: 3,
        key_skills: ['Big-O', 'Spatial Locality', 'Profiling']
      },
      {
        id: 5,
        topic: 'Concurrent Programming & Asynchronous Patterns',
        description: 'Multithreading synchronization, race condition elimination, and event loops.',
        status: 'Locked',
        order_no: 5,
        estimated_time: '55 mins',
        exercises_count: 3,
        key_skills: ['Async/Await', 'Locks', 'Thread Safety']
      }
    ];
  }

  if (level === 'Intermediate') {
    return [
      {
        id: 1,
        topic: `Object-Oriented Design in ${lang}`,
        description: 'Deep dive into inheritance, polymorphism, encapsulation, and composition.',
        status: 'In Progress',
        order_no: 1,
        estimated_time: '35 mins',
        exercises_count: 3,
        key_skills: ['Classes', 'Interfaces', 'Polymorphism']
      },
      {
        id: 2,
        topic: 'Linear Data Structures (Stacks & Queues)',
        description: 'Implement LIFO and FIFO queues, monotonic stacks, and parentheses matching.',
        status: 'Locked',
        order_no: 2,
        estimated_time: '40 mins',
        exercises_count: 4,
        key_skills: ['Stack', 'Queue', 'Monotonic Stack']
      },
      {
        id: 3,
        topic: 'Linked Lists & Pointer Reversals',
        description: 'Singly and doubly linked list pointer navigation, fast-slow two-pointer cycles.',
        status: 'Locked',
        order_no: 3,
        estimated_time: '45 mins',
        exercises_count: 4,
        key_skills: ['Fast/Slow Pointers', 'Cycle Detection']
      },
      {
        id: 4,
        topic: 'Searching & Sorting Fundamentals',
        description: 'Binary search boundaries, Merge Sort divide-and-conquer, and Quick Sort partitions.',
        status: 'Locked',
        order_no: 4,
        estimated_time: '50 mins',
        exercises_count: 5,
        key_skills: ['Binary Search', 'Merge Sort', 'Quick Sort']
      },
      {
        id: 5,
        topic: 'Hash Maps & Set Lookups',
        description: 'Hash tables under the hood, collision resolution, and frequency count patterns.',
        status: 'Locked',
        order_no: 5,
        estimated_time: '35 mins',
        exercises_count: 4,
        key_skills: ['Hash Maps', 'Hash Sets', 'Collision Handling']
      },
      {
        id: 6,
        topic: 'Recursion & Backtracking Primer',
        description: 'Base case definition, stack call visualization, subsets, and permutations.',
        status: 'Locked',
        order_no: 6,
        estimated_time: '60 mins',
        exercises_count: 3,
        key_skills: ['Composite Data', 'Problem Solving']
      }
    ];
  }

  return [
    {
      id: 1,
      topic: `Syntax, Variables & Data Types in ${lang}`,
      description: 'Understand variable declarations, primitive types (int, float, string, bool), and console I/O.',
      status: 'In Progress',
      order_no: 1,
      estimated_time: '25 mins',
      exercises_count: 3,
      key_skills: ['Variables', 'Types', 'Console I/O']
    },
    {
      id: 2,
      topic: 'Control Flow & Conditionals',
      description: 'Master if-else logic, comparison operators, and logical boolean chaining.',
      status: 'Locked',
      order_no: 2,
      estimated_time: '30 mins',
      exercises_count: 3,
      key_skills: ['if-else', 'Boolean Logic']
    },
    {
      id: 3,
      topic: 'Loops & Iterations',
      description: 'for loops, while loops, break, continue, and iterating through sequence ranges.',
      status: 'Locked',
      order_no: 3,
      estimated_time: '35 mins',
      exercises_count: 4,
      key_skills: ['for loops', 'while loops', 'Ranges']
    },
    {
      id: 4,
      topic: 'Functions & Scope',
      description: 'Declaring functions, positional arguments, return values, and local vs global scope.',
      status: 'Locked',
      order_no: 4,
      estimated_time: '35 mins',
      exercises_count: 4,
      key_skills: ['Functions', 'Arguments', 'Scope']
    },
    {
      id: 5,
      topic: 'Arrays & Lists',
      description: 'Index operations, push/pop mutations, slicing, and linear searches.',
      status: 'Locked',
      order_no: 5,
      estimated_time: '40 mins',
      exercises_count: 5,
      key_skills: ['Indexing', 'Slicing', 'Mutations']
    },
    {
      id: 6,
      topic: 'Strings & Basic Formatting',
      description: 'String concatenation, interpolation, trimming, character frequency, and ASCII values.',
      status: 'Locked',
      order_no: 6,
      estimated_time: '30 mins',
      exercises_count: 3,
      key_skills: ['String Ops', 'Formatting', 'ASCII']
    },
    {
      id: 7,
      topic: 'Debugging & Common Errors',
      description: 'Interpreting compiler error messages, off-by-one errors, and clean defensive checks.',
      status: 'Locked',
      order_no: 7,
      estimated_time: '25 mins',
      exercises_count: 3,
      key_skills: ['Stack Trace', 'Defensive Logic']
    }
  ];
};

export const getLearningPath = async (userId, language, level) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  const lang = language || user?.preferredLanguage || 'Python';

  try {
    const res = await api.get(`/learning-paths/${idToFind}`);
    if (res.data && res.data.length > 0) {
      localStorage.setItem(`learning_path_${idToFind}`, JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {}

  const cached = localStorage.getItem(`learning_path_${idToFind}`);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {}
  }

  const defaultPath = getDefaultTopicsForLanguage(lang, level);
  localStorage.setItem(`learning_path_${idToFind}`, JSON.stringify(defaultPath));
  return defaultPath;
};

export const updateTopicStatus = async (id, status) => {
  const user = getCurrentUser();
  const userId = user ? user.id : 1;

  try {
    const res = await api.put(`/learning-paths/${id}`, { status });
    return res.data;
  } catch (err) {}

  const cached = localStorage.getItem(`learning_path_${userId}`);
  if (cached) {
    try {
      const list = JSON.parse(cached);
      const updated = list.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      localStorage.setItem(`learning_path_${userId}`, JSON.stringify(updated));
      return updated.find((u) => u.id === id);
    } catch (e) {}
  }

  return { id, status };
};

export const resetLearningPath = async (userId, language, level) => {
  const user = getCurrentUser();
  const idToFind = userId || (user ? user.id : 1);
  const lang = language || 'Python';

  try {
    const res = await api.post(`/learning-paths/reset/${idToFind}`, null, {
      params: { language: lang, level }
    });
    if (res.data) {
      localStorage.setItem(`learning_path_${idToFind}`, JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {}

  const newPath = getDefaultTopicsForLanguage(lang, level);
  localStorage.setItem(`learning_path_${idToFind}`, JSON.stringify(newPath));
  return newPath;
};