export const conceptDefinitions = {
  'what is c': {
    title: 'What is C',
    keywords: ['c', 'c language', 'c programming'],
    definition: 'C is a low-level, procedural programming language that provides direct access to computer memory and hardware.'
  },
  'what is java': {
    title: 'What is Java',
    keywords: ['java', 'jvm', 'bytecode'],
    definition: 'Java is a class-based, object-oriented programming language designed to run on any device using the Java Virtual Machine.'
  },
  'what is python': {
    title: 'What is Python',
    keywords: ['python'],
    definition: 'Python is a high-level, interpreted programming language known for its clear, readable syntax and versatility.'
  },
  'what is javascript': {
    title: 'What is JavaScript',
    keywords: ['javascript', 'js'],
    definition: 'JavaScript is a dynamic programming language used primarily to create interactive, responsive behavior on web pages.'
  },
  'what is a variable': {
    title: 'What is a Variable',
    keywords: ['variable', 'variables'],
    definition: 'A variable is a named storage location in memory that holds a value that can be read or modified by a program.'
  },
  'what is a loop': {
    title: 'What is a Loop',
    keywords: ['loop', 'loops', 'for loop', 'while loop', 'iteration'],
    definition: 'A loop is a control flow structure that repeats a block of instructions until a specified condition is satisfied.'
  },
  'what is a function': {
    title: 'What is a Function',
    keywords: ['function', 'functions', 'method'],
    definition: 'A function is a reusable block of code that takes optional inputs, performs a specific task, and returns an output.'
  },
  'what is an array': {
    title: 'What is an Array',
    keywords: ['array', 'arrays', 'list'],
    definition: 'An array is an ordered data structure that stores a collection of elements in contiguous memory locations.'
  },
  'what is oop': {
    title: 'What is OOP',
    keywords: ['oop', 'object oriented', 'class', 'classes', 'object', 'objects', 'encapsulation', 'inheritance', 'polymorphism'],
    definition: 'Object-Oriented Programming is a programming paradigm centered around objects that bundle data and behavior together.'
  },
  'what is recursion': {
    title: 'What is Recursion',
    keywords: ['recursion', 'recursive', 'base case'],
    definition: 'Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem until reaching a base condition.'
  }
};

export const exerciseConceptMap = {
  'two sum': 'A hash map is an associative data structure that stores key-value pairs for rapid constant-time lookup.',
  'valid parentheses': 'A stack is a linear data structure that operates on a last-in, first-out order to match opening and closing symbols.',
  'add two numbers': 'A linked list is a linear collection of data elements where each node points to the next node in sequence.',
  'merge two sorted lists': 'A linked list is a sequence of connected nodes that can be merged by updating their next pointers in sorted order.',
  'longest substring': 'A sliding window is an algorithmic technique that tracks a subsegment of elements using two moving boundary pointers.',
  'climbing stairs': 'Dynamic programming is a problem-solving approach that breaks a problem into overlapping subproblems and stores their answers.',
  'pointer arithmetic': 'Pointer arithmetic involves calculating and traversing computer memory addresses directly using memory offsets.',
  'dynamic memory allocation': 'Dynamic memory allocation is the process of reserving and freeing heap memory at runtime using allocation functions.'
};

export const fallbackChips = [
  'What is a Variable',
  'What is a Loop',
  'What is a Function'
];

export const chatQuestionsData = [];

export const chatSuggestions = fallbackChips;
