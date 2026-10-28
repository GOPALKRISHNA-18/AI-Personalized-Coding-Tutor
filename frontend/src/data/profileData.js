export const defaultProfile = {
  name: 'Gopal Krishna',
  email: 'gopal.krishna@example.com',
  phone: '+91 98765 43210',
  preferredLanguage: 'Python',
  skillLevel: 'Beginner',
  bio: 'Passionate developer mastering algorithmic patterns, data structures, and AI-assisted programming.'
};

export const profileStats = [
  { label: 'Exercises Completed', value: '28' },
  { label: 'Quizzes Taken', value: '14' },
  { label: 'Average Score', value: '92%' }
];

export const languageOptions = ['Java', 'Python', 'JavaScript', 'C'];

export const skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced'];

export const formFields = [
  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
  { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter your phone number' },
  { id: 'preferredLanguage', label: 'Preferred Language', type: 'select', options: languageOptions },
  { id: 'skillLevel', label: 'Skill Level', type: 'select', options: skillLevelOptions },
  { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Brief summary about yourself' }
];
