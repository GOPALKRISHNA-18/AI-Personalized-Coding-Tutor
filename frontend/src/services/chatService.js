import api from './api';
import { getCurrentUser } from './authService';
import { chatQuestionsData, chatSuggestions } from '../data/chatQuestionsData';

const getUserId = () => {
  const user = getCurrentUser();
  if (user && user.id) {
    return user.id;
  }
  const raw = localStorage.getItem('current_user');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) {
        return parsed.id;
      }
    } catch (e) {}
  }
  return 1;
};

export const getQuestions = async () => {
  try {
    const res = await api.get('/tutor/questions');
    if (res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (e) {
    console.warn('Backend /tutor/questions failed, using dynamic questions:', e?.message);
  }
  return chatQuestionsData;
};

export const getSuggestions = () => chatSuggestions;

export const askQuestion = async (message) => {
  const userId = getUserId();
  try {
    const res = await api.post('/tutor/ask', {
      userId,
      message,
    });
    if (res.data) {
      saveLocalChatMessage(userId, 'user', message);
      saveLocalChatMessage(userId, 'tutor', res.data.reply || res.data.message || '', res.data.exampleCode, res.data.exampleLanguage);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /tutor/ask unavailable, using smart client-side tutor engine:', err?.message);
  }

  const fallbackResponse = generateLocalTutorReply(message);
  saveLocalChatMessage(userId, 'user', message);
  saveLocalChatMessage(userId, 'tutor', fallbackResponse.reply, fallbackResponse.exampleCode, fallbackResponse.exampleLanguage);
  return fallbackResponse;
};

export const getHistory = async () => {
  const userId = getUserId();
  try {
    const res = await api.get(`/chat/${userId}`);
    if (res.data && res.data.length > 0) {
      localStorage.setItem(`chat_history_${userId}`, JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.warn('Backend /chat history failed, loading local chat:', e?.message);
  }

  const cached = localStorage.getItem(`chat_history_${userId}`);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (err) {}
  }

  const initialGreeting = [
    {
      id: 1,
      sender: 'tutor',
      message:
        'Hello! 👋 I am your AI Personalized Coding Tutor. You can ask me any coding questions, request debugging help, or ask for examples across Python, Java, JavaScript, C++, and C.',
      exampleCode: 'def greet(name):\n    return f"Welcome, {name}! Ready to master coding?"\n\nprint(greet("Learner"))',
      exampleLanguage: 'Python',
      timestamp: new Date().toISOString()
    }
  ];
  localStorage.setItem(`chat_history_${userId}`, JSON.stringify(initialGreeting));
  return initialGreeting;
};

export const clearHistory = async () => {
  const userId = getUserId();
  try {
    await api.delete(`/chat/${userId}`);
  } catch (e) {
    console.warn('Backend clear history error:', e?.message);
  }
  localStorage.removeItem(`chat_history_${userId}`);
  return [];
};

const saveLocalChatMessage = (userId, sender, message, exampleCode, exampleLanguage) => {
  const key = `chat_history_${userId}`;
  const existing = localStorage.getItem(key);
  let list = [];
  if (existing) {
    try {
      list = JSON.parse(existing);
    } catch (e) {
      list = [];
    }
  }
  list.push({
    id: Date.now(),
    sender,
    message,
    exampleCode: exampleCode || null,
    exampleLanguage: exampleLanguage || null,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(list));
};

const generateLocalTutorReply = (questionText) => {
  const text = (questionText || '').toLowerCase().trim();

  if (text.includes('python')) {
    return {
      reply: '**Python** is an interpreted, high-level, dynamically typed language created by Guido van Rossum. It emphasizes readability with its clean indentation syntax and is widely used for Data Science, AI/ML, backend web services (FastAPI/Django), and automation.',
      exampleCode: 'squares = [x**2 for x in range(1, 6) if x % 2 == 1]\nprint("Odd squares:", squares)',
      exampleLanguage: 'Python'
    };
  }

  if (text.includes('java') && !text.includes('javascript')) {
    return {
      reply: '**Java** is a class-based, object-oriented language designed with the "Write Once, Run Anywhere" (WORA) philosophy. Code compiles to bytecode executed by the Java Virtual Machine (JVM). Widely used in enterprise backends (Spring Boot) and Android development.',
      exampleCode: 'import java.util.List;\n\npublic class Solution {\n    public static void main(String[] args) {\n        List<String> langs = List.of("Java", "Kotlin", "Scala");\n        langs.forEach(System.out::println);\n    }\n}',
      exampleLanguage: 'Java'
    };
  }

  if (text.includes('javascript') || text.includes('js')) {
    return {
      reply: '**JavaScript** is a lightweight, dynamic, single-threaded language that powers the interactive modern web. Along with HTML and CSS, it executes in browser engines (V8, SpiderMonkey) and on servers via Node.js.',
      exampleCode: 'const user = { name: "Gopal Krishna", role: "Fullstack Learner" };\nconst { name, role } = user;\nreturn `${name} -> ${role}`;',
      exampleLanguage: 'JavaScript'
    };
  }

  if (text.includes('time complexity') || text.includes('big-o') || text.includes('big o')) {
    return {
      reply: `**Time Complexity & Big-O Notation:**
Big-O describes how the execution time or space requirements of an algorithm scale as the input size $n$ grows toward infinity.

- **$O(1)$ - Constant**: Hash map lookup, array index access.
- **$O(\\log n)$ - Logarithmic**: Binary search dividing the search space in half.
- **$O(n)$ - Linear**: Visiting each element once.
- **$O(n \\log n)$ - Linearithmic**: Optimal comparison-based sorting (Merge Sort, Quick Sort).
- **$O(n^2)$ - Quadratic**: Nested loops checking all pairs.`,
      exampleCode: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1',
      exampleLanguage: 'Python'
    };
  }

  if (text.includes('binary search')) {
    return {
      reply: `**Binary Search** is an $O(\\log n)$ search algorithm that operates on a **sorted array**.
1. Compare target with the middle element.
2. If target matches, return the index.
3. If target is less than the middle element, narrow the search to the lower half.
4. If target is greater, narrow to the upper half.
5. Repeat until found or the search window is empty.`,
      exampleCode: 'function binarySearch(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
      exampleLanguage: 'JavaScript'
    };
  }

  if (text.includes('stack') || text.includes('queue')) {
    return {
      reply: `**Stacks vs Queues:**

- **Stack (LIFO - Last In, First Out)**: You add items to the top (\`push\`) and take from the top (\`pop\`). Used in bracket validation, browser history, and call stacks.
- **Queue (FIFO - First In, First Out)**: The first item added is the first one processed (\`enqueue\` / \`dequeue\`). Used in breadth-first search and asynchronous task processing.`,
      exampleCode: 'class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(val) { this.items.push(val); }\n  pop() { return this.items.pop(); }\n  peek() { return this.items[this.items.length - 1]; }\n}\n\nconst s = new Stack();\ns.push(10);\ns.push(20);\nreturn s.pop();',
      exampleLanguage: 'JavaScript'
    };
  }

  if (text.includes('oop') || text.includes('object oriented')) {
    return {
      reply: `**Object-Oriented Programming (OOP)** organizes software around objects and classes.

**The Four Pillars of OOP:**
1. **Encapsulation**: Bundling attributes and methods inside a class, hiding internal details.
2. **Inheritance**: Creating new classes based on existing ones to promote code reusability.
3. **Polymorphism**: Allowing different classes to respond to the same method call in distinct ways.
4. **Abstraction**: Exposing clean interfaces while concealing underlying complexity.`,
      exampleCode: 'class Car {\n    private String brand;\n    private int speed;\n\n    public Car(String brand) {\n        this.brand = brand;\n        this.speed = 0;\n    }\n\n    public void accelerate(int increment) {\n        this.speed += increment;\n        System.out.println(brand + " speed: " + speed + " km/h");\n    }\n}',
      exampleLanguage: 'Java'
    };
  }

  if (text.includes('loop') || text.includes('for') || text.includes('while')) {
    return {
      reply: `**Loops in Programming:**
Loops execute a block of code multiple times.

- **For Loop**: Ideal when you know the number of iterations in advance or when iterating over a sequence.
- **While Loop**: Ideal when you need to repeat execution until a dynamic boolean condition becomes false.`,
      exampleCode: 'for i in range(1, 6):\n    print(f"Count: {i}")\n\ncount = 5\nwhile count > 0:\n    print(f"Countdown: {count}")\n    count -= 1',
      exampleLanguage: 'Python'
    };
  }

  if (text.includes('debug') || text.includes('error') || text.includes('fix')) {
    return {
      reply: `Here is a systematic debugging checklist:

1. **Read the Stack Trace**: Identify the exact line number and exception name.
2. **Print Variables**: Inspect values right before the failing line.
3. **Check Types & Boundaries**: Ensure indices are within bounds (\`0\` to \`length - 1\`).
4. **Check Off-By-One Errors**: Check \`<\` vs \`<=\`.

Paste your code snippet here and I will gladly analyze it step by step!`,
      exampleCode: 'function getElementSafely(arr, index) {\n  if (!Array.isArray(arr) || index < 0 || index >= arr.length) {\n    return null;\n  }\n  return arr[index];\n}',
      exampleLanguage: 'JavaScript'
    };
  }

  return {
    reply: `That is an excellent topic! When solving programming problems, I always recommend writing down the inputs, expected outputs, and edge cases before coding.

Would you like an example in **Python**, **Java**, **JavaScript**, **C++**, or **C**? Feel free to ask or pick from the question list on the left!`,
    exampleCode: 'function solveProblem(input) {\n  if (!input) return null;\n  const result = input.toUpperCase();\n  return result;\n}',
    exampleLanguage: 'JavaScript'
  };
};