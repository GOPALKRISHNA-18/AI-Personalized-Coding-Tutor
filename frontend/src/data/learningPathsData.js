export const learningPathsData = [
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & Data Science',
    subtitle: 'From core syntax to advanced object-oriented programming',
    estimatedTime: '12.5 hrs left',
    topics: [
      {
        id: 'py-1',
        topicNumber: 1,
        title: 'Variables, Types & Memory',
        shortDesc: 'Understand variable bindings, primitive types, dynamic typing, and console I/O.',
        estimatedTime: '45 mins',
        status: 'completed',
        lessons: [
          { id: 'py-1-1', title: 'Primitive Data Types & Memory Assignment', duration: '15 mins', completed: true },
          { id: 'py-1-2', title: 'Type Casting & User Input Operations', duration: '15 mins', completed: true },
          { id: 'py-1-3', title: 'String Interpolation with f-Strings', duration: '15 mins', completed: true }
        ]
      },
      {
        id: 'py-2',
        topicNumber: 2,
        title: 'Conditionals & Boolean Logic',
        shortDesc: 'Master if, elif, else chains, logical operators, and comparison expressions.',
        estimatedTime: '50 mins',
        status: 'completed',
        lessons: [
          { id: 'py-2-1', title: 'Boolean Operators & Truth Value Testing', duration: '15 mins', completed: true },
          { id: 'py-2-2', title: 'if-elif-else Decision Trees', duration: '20 mins', completed: true },
          { id: 'py-2-3', title: 'Short-Circuit Evaluation & Ternary Expressions', duration: '15 mins', completed: true }
        ]
      },
      {
        id: 'py-3',
        topicNumber: 3,
        title: 'Loops & Iteration Patterns',
        shortDesc: 'Control iteration using for loops, while loops, range generator, and break/continue.',
        estimatedTime: '60 mins',
        status: 'current',
        lessons: [
          { id: 'py-3-1', title: 'For Loops & the range() Function', duration: '20 mins', completed: true },
          { id: 'py-3-2', title: 'While Loops & Infinite Loop Prevention', duration: '20 mins', completed: false },
          { id: 'py-3-3', title: 'List Comprehensions & Enumerate', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'py-4',
        topicNumber: 4,
        title: 'Functions, Lambdas & Scope',
        shortDesc: 'Define modular functions, explore scope lifetime, and handle variable arguments.',
        estimatedTime: '55 mins',
        status: 'locked',
        lessons: [
          { id: 'py-4-1', title: 'Function Signatures & Return Values', duration: '20 mins', completed: false },
          { id: 'py-4-2', title: 'Arbitrary Arguments (*args & **kwargs)', duration: '20 mins', completed: false },
          { id: 'py-4-3', title: 'Lambda Expressions & First-Class Functions', duration: '15 mins', completed: false }
        ]
      },
      {
        id: 'py-5',
        topicNumber: 5,
        title: 'Data Structures - Lists, Dicts & Sets',
        shortDesc: 'Deep dive into mutability, fast dictionary hashing, and unique set operations.',
        estimatedTime: '65 mins',
        status: 'locked',
        lessons: [
          { id: 'py-5-1', title: 'List Slicing, Sorting & Mutations', duration: '25 mins', completed: false },
          { id: 'py-5-2', title: 'Dictionary Keys, Lookups & Methods', duration: '20 mins', completed: false },
          { id: 'py-5-3', title: 'Set Theory, Intersections & Uniqueness', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'py-6',
        topicNumber: 6,
        title: 'Object-Oriented Python',
        shortDesc: 'Encapsulate state with classes, self references, inheritance, and dunder methods.',
        estimatedTime: '70 mins',
        status: 'locked',
        lessons: [
          { id: 'py-6-1', title: 'Classes, Objects & __init__ Constructor', duration: '25 mins', completed: false },
          { id: 'py-6-2', title: 'Class Inheritance & super() Calls', duration: '25 mins', completed: false },
          { id: 'py-6-3', title: 'Dunder Methods (__str__, __repr__, __len__)', duration: '20 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Enterprise Engineering',
    subtitle: 'Robust object-oriented architectures and JVM memory mastery',
    estimatedTime: '15.0 hrs left',
    topics: [
      {
        id: 'java-1',
        topicNumber: 1,
        title: 'Syntax & Primitive Types',
        shortDesc: 'Strong typing semantics, variable declarations, arithmetic operators, and main method.',
        estimatedTime: '40 mins',
        status: 'completed',
        lessons: [
          { id: 'java-1-1', title: 'JVM Architecture & Public Static Void Main', duration: '15 mins', completed: true },
          { id: 'java-1-2', title: 'Primitive Types, Range & Casting', duration: '15 mins', completed: true },
          { id: 'java-1-3', title: 'Operators, Precedence & Expressions', duration: '10 mins', completed: true }
        ]
      },
      {
        id: 'java-2',
        topicNumber: 2,
        title: 'Control Flow & Loops',
        shortDesc: 'Implement decision branches, switch expressions, and loop iterations.',
        estimatedTime: '50 mins',
        status: 'current',
        lessons: [
          { id: 'java-2-1', title: 'If-Else Conditionals & Ternary Operator', duration: '15 mins', completed: true },
          { id: 'java-2-2', title: 'Modern Switch Expressions & Pattern Matching', duration: '15 mins', completed: false },
          { id: 'java-2-3', title: 'For, While & Enhanced For-Each Loops', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'java-3',
        topicNumber: 3,
        title: 'OOP & Class Structure',
        shortDesc: 'Encapsulate fields, write constructors, and leverage access modifiers.',
        estimatedTime: '60 mins',
        status: 'locked',
        lessons: [
          { id: 'java-3-1', title: 'Classes, Objects & Heap Allocations', duration: '20 mins', completed: false },
          { id: 'java-3-2', title: 'Constructors & Keyword this', duration: '20 mins', completed: false },
          { id: 'java-3-3', title: 'Getters, Setters & Access Modifiers', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'java-4',
        topicNumber: 4,
        title: 'Inheritance & Interfaces',
        shortDesc: 'Design scalable contracts using interfaces and class hierarchies.',
        estimatedTime: '65 mins',
        status: 'locked',
        lessons: [
          { id: 'java-4-1', title: 'Extending Classes & super Constructor', duration: '20 mins', completed: false },
          { id: 'java-4-2', title: 'Method Overriding vs Method Overloading', duration: '20 mins', completed: false },
          { id: 'java-4-3', title: 'Interfaces & Multiple Implementations', duration: '25 mins', completed: false }
        ]
      },
      {
        id: 'java-5',
        topicNumber: 5,
        title: 'Collections Framework',
        shortDesc: 'Master dynamic data with ArrayList, HashSet, HashMap, and Iterators.',
        estimatedTime: '70 mins',
        status: 'locked',
        lessons: [
          { id: 'java-5-1', title: 'Lists & ArrayList Under the Hood', duration: '20 mins', completed: false },
          { id: 'java-5-2', title: 'Hash Sets & Uniqueness Invariants', duration: '25 mins', completed: false },
          { id: 'java-5-3', title: 'Hash Maps, Buckets & Key Lookups', duration: '25 mins', completed: false }
        ]
      },
      {
        id: 'java-6',
        topicNumber: 6,
        title: 'Exceptions & Generics',
        shortDesc: 'Handle runtime errors cleanly and build type-safe generic classes.',
        estimatedTime: '60 mins',
        status: 'locked',
        lessons: [
          { id: 'java-6-1', title: 'Checked vs Unchecked Exceptions', duration: '20 mins', completed: false },
          { id: 'java-6-2', title: 'Try-Catch-Finally & Try-With-Resources', duration: '20 mins', completed: false },
          { id: 'java-6-3', title: 'Generic Classes, Methods & Type Erasure', duration: '20 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Fullstack Web',
    subtitle: 'Asynchronous event loops, functional patterns, and ES6+ standards',
    estimatedTime: '10.5 hrs left',
    topics: [
      {
        id: 'js-1',
        topicNumber: 1,
        title: 'Modern Syntax & Declarations',
        shortDesc: 'Master let, const, temporal dead zone, arrow functions, and template literals.',
        estimatedTime: '45 mins',
        status: 'completed',
        lessons: [
          { id: 'js-1-1', title: 'var vs let vs const Scope Boundaries', duration: '15 mins', completed: true },
          { id: 'js-1-2', title: 'Arrow Functions & Lexical this Binding', duration: '15 mins', completed: true },
          { id: 'js-1-3', title: 'Template Literals & Destructuring Syntax', duration: '15 mins', completed: true }
        ]
      },
      {
        id: 'js-2',
        topicNumber: 2,
        title: 'Arrays & Functional Iteration',
        shortDesc: 'Transform collections immutably with map, filter, reduce, and spread operators.',
        estimatedTime: '55 mins',
        status: 'completed',
        lessons: [
          { id: 'js-2-1', title: 'Array Methods: map, filter, and find', duration: '20 mins', completed: true },
          { id: 'js-2-2', title: 'Accumulating Values with Array.reduce', duration: '20 mins', completed: true },
          { id: 'js-2-3', title: 'Rest and Spread Syntax with Arrays & Objects', duration: '15 mins', completed: true }
        ]
      },
      {
        id: 'js-3',
        topicNumber: 3,
        title: 'Asynchronous JS & Event Loop',
        shortDesc: 'Understand microtasks, macrotasks, promises, and async/await error handling.',
        estimatedTime: '65 mins',
        status: 'current',
        lessons: [
          { id: 'js-3-1', title: 'The JavaScript Event Loop & Call Stack', duration: '20 mins', completed: true },
          { id: 'js-3-2', title: 'Promises, States & Chaining', duration: '25 mins', completed: true },
          { id: 'js-3-3', title: 'Async/Await Syntax & Try-Catch Pipelines', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'js-4',
        topicNumber: 4,
        title: 'DOM APIs & Event Bubbling',
        shortDesc: 'Query elements, dispatch synthetic events, and capture event bubbling phases.',
        estimatedTime: '50 mins',
        status: 'locked',
        lessons: [
          { id: 'js-4-1', title: 'DOM Querying, Tree Traversal & Attributes', duration: '15 mins', completed: false },
          { id: 'js-4-2', title: 'Event Delegation & stopPropagation()', duration: '20 mins', completed: false },
          { id: 'js-4-3', title: 'Fetch API & Handling Async Responses', duration: '15 mins', completed: false }
        ]
      },
      {
        id: 'js-5',
        topicNumber: 5,
        title: 'Closures & Prototypal Chains',
        shortDesc: 'Preserve private state with closures and explore prototype delegation.',
        estimatedTime: '60 mins',
        status: 'locked',
        lessons: [
          { id: 'js-5-1', title: 'Lexical Environment & Closure Mechanics', duration: '20 mins', completed: false },
          { id: 'js-5-2', title: 'Prototype Inheritance & Object.create()', duration: '20 mins', completed: false },
          { id: 'js-5-3', title: 'ES6 Class Syntax as Syntactic Sugar', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'js-6',
        topicNumber: 6,
        title: 'Modules & Modern Tooling',
        shortDesc: 'Organize modular applications using ES modules, bundlers, and npm ecosystem.',
        estimatedTime: '45 mins',
        status: 'locked',
        lessons: [
          { id: 'js-6-1', title: 'ES Modules: import and export Patterns', duration: '15 mins', completed: false },
          { id: 'js-6-2', title: 'npm Packages & package.json Manifests', duration: '15 mins', completed: false },
          { id: 'js-6-3', title: 'Bundlers, Transpilers & Vite Build Tools', duration: '15 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'c',
    name: 'C',
    category: 'Systems & Hardware',
    subtitle: 'Low-level memory management, pointers, and performance optimization',
    estimatedTime: '16.0 hrs left',
    topics: [
      {
        id: 'c-1',
        topicNumber: 1,
        title: 'C Fundamentals & Compilation',
        shortDesc: 'Preprocessor directives, standard I/O, format specifiers, and compiler stages.',
        estimatedTime: '45 mins',
        status: 'completed',
        lessons: [
          { id: 'c-1-1', title: 'Structure of a C Program & GCC Compiler', duration: '15 mins', completed: true },
          { id: 'c-1-2', title: 'Primitive Types, Sizes & Format Specifiers', duration: '15 mins', completed: true },
          { id: 'c-1-3', title: 'Bitwise Operators & Bitmasking Patterns', duration: '15 mins', completed: true }
        ]
      },
      {
        id: 'c-2',
        topicNumber: 2,
        title: 'Control Flow & Functions',
        shortDesc: 'Decision making, iterations, function prototypes, and call by value.',
        estimatedTime: '50 mins',
        status: 'current',
        lessons: [
          { id: 'c-2-1', title: 'Conditional Branching & Switch Statements', duration: '15 mins', completed: true },
          { id: 'c-2-2', title: 'Loops: for, while & do-while Invariants', duration: '15 mins', completed: false },
          { id: 'c-2-3', title: 'Function Prototypes & Call by Value', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'c-3',
        topicNumber: 3,
        title: 'Pointers & Memory Addresses',
        shortDesc: 'Understand memory addresses, dereferencing, and pointer arithmetic.',
        estimatedTime: '70 mins',
        status: 'locked',
        lessons: [
          { id: 'c-3-1', title: 'Address-Of (&) and Dereference (*) Operators', duration: '25 mins', completed: false },
          { id: 'c-3-2', title: 'Pointer Arithmetic & Array Pointer Decay', duration: '25 mins', completed: false },
          { id: 'c-3-3', title: 'Passing Pointers to Functions (Call by Reference)', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'c-4',
        topicNumber: 4,
        title: 'Arrays, Strings & Structs',
        shortDesc: 'Navigate stack arrays, null-terminated strings, and custom struct layouts.',
        estimatedTime: '60 mins',
        status: 'locked',
        lessons: [
          { id: 'c-4-1', title: '1D & 2D Stack Arrays in Memory', duration: '20 mins', completed: false },
          { id: 'c-4-2', title: 'String Manipulation with string.h Utilities', duration: '20 mins', completed: false },
          { id: 'c-4-3', title: 'Struct Declarations, Padding & Typedefs', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'c-5',
        topicNumber: 5,
        title: 'Dynamic Memory Allocation',
        shortDesc: 'Allocate heap memory dynamically with malloc, calloc, realloc, and free.',
        estimatedTime: '65 mins',
        status: 'locked',
        lessons: [
          { id: 'c-5-1', title: 'Heap Allocation with malloc & calloc', duration: '25 mins', completed: false },
          { id: 'c-5-2', title: 'Resizing with realloc & Avoiding Memory Leaks', duration: '20 mins', completed: false },
          { id: 'c-5-3', title: 'Valgrind Diagnostics & Dangling Pointers', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'c-6',
        topicNumber: 6,
        title: 'File I/O & Macros',
        shortDesc: 'Read and write binary and text files, and master preprocessor macros.',
        estimatedTime: '55 mins',
        status: 'locked',
        lessons: [
          { id: 'c-6-1', title: 'File Streams: fopen, fread, fwrite & fclose', duration: '20 mins', completed: false },
          { id: 'c-6-2', title: 'Preprocessor Macros & Header Include Guards', duration: '20 mins', completed: false },
          { id: 'c-6-3', title: 'Command-Line Arguments (argc, argv)', duration: '15 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    category: 'Interview Mastery',
    subtitle: 'High-frequency algorithmic paradigms, trees, heaps, and dynamic programming',
    estimatedTime: '22.0 hrs left',
    topics: [
      {
        id: 'ds-1',
        topicNumber: 1,
        title: 'Arrays & Two Pointers',
        shortDesc: 'Two-pointer convergence, contiguous sliding window, and prefix sums.',
        estimatedTime: '50 mins',
        status: 'completed',
        lessons: [
          { id: 'ds-1-1', title: 'Contiguous Memory Arrays & Cache Locality', duration: '15 mins', completed: true },
          { id: 'ds-1-2', title: 'Two-Pointer Technique on Sorted Arrays', duration: '20 mins', completed: true },
          { id: 'ds-1-3', title: 'Sliding Window Pattern for Subarrays', duration: '15 mins', completed: true }
        ]
      },
      {
        id: 'ds-2',
        topicNumber: 2,
        title: 'Linked Lists & Pointers',
        shortDesc: 'Node traversal, pointer reversals, and fast/slow cycle detection.',
        estimatedTime: '60 mins',
        status: 'current',
        lessons: [
          { id: 'ds-2-1', title: 'Singly Linked List: Insertion & Deletion', duration: '20 mins', completed: true },
          { id: 'ds-2-2', title: 'Iterative & Recursive List Reversals', duration: '20 mins', completed: false },
          { id: 'ds-2-3', title: 'Fast & Slow Pointers (Floyds Cycle Detection)', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'ds-3',
        topicNumber: 3,
        title: 'Stacks, Queues & Monotonic Deques',
        shortDesc: 'LIFO and FIFO mechanics, balanced brackets, and next greater element.',
        estimatedTime: '65 mins',
        status: 'locked',
        lessons: [
          { id: 'ds-3-1', title: 'LIFO Stack: Push, Pop & Bracket Matching', duration: '20 mins', completed: false },
          { id: 'ds-3-2', title: 'FIFO Queue & Circular Buffer Implementation', duration: '20 mins', completed: false },
          { id: 'ds-3-3', title: 'Monotonic Stacks for Next Greater Element', duration: '25 mins', completed: false }
        ]
      },
      {
        id: 'ds-4',
        topicNumber: 4,
        title: 'Binary Trees & BST Traversals',
        shortDesc: 'Recursive traversals, level-order BFS, and binary search tree properties.',
        estimatedTime: '75 mins',
        status: 'locked',
        lessons: [
          { id: 'ds-4-1', title: 'Tree Anatomy: Inorder, Preorder, Postorder', duration: '25 mins', completed: false },
          { id: 'ds-4-2', title: 'Breadth-First Search (Queue Level-Order)', duration: '25 mins', completed: false },
          { id: 'ds-4-3', title: 'Binary Search Tree Lookups & Validations', duration: '25 mins', completed: false }
        ]
      },
      {
        id: 'ds-5',
        topicNumber: 5,
        title: 'Heaps & Priority Queues',
        shortDesc: 'Min-heaps, max-heaps, heapify operations, and Top-K frequent elements.',
        estimatedTime: '70 mins',
        status: 'locked',
        lessons: [
          { id: 'ds-5-1', title: 'Binary Heap Properties & Array Representation', duration: '25 mins', completed: false },
          { id: 'ds-5-2', title: 'Heapify, Insert & Extract Min / Max', duration: '25 mins', completed: false },
          { id: 'ds-5-3', title: 'Top-K Elements Pattern & PriorityQueues', duration: '20 mins', completed: false }
        ]
      },
      {
        id: 'ds-6',
        topicNumber: 6,
        title: 'Graphs & Dynamic Programming',
        shortDesc: 'Graph representations, BFS/DFS pathfinding, and 1D/2D memoization.',
        estimatedTime: '90 mins',
        status: 'locked',
        lessons: [
          { id: 'ds-6-1', title: 'Adjacency Lists & Graph Traversal (BFS / DFS)', duration: '30 mins', completed: false },
          { id: 'ds-6-2', title: '1D Dynamic Programming & Recurrence Relations', duration: '30 mins', completed: false },
          { id: 'ds-6-3', title: '2D Grid Memoization & 0/1 Knapsack Pattern', duration: '30 mins', completed: false }
        ]
      }
    ]
  }
];

export const weeklyStudyData = [
  { day: 'Mon', hours: 1.5, percent: 38 },
  { day: 'Tue', hours: 2.2, percent: 55 },
  { day: 'Wed', hours: 1.0, percent: 25 },
  { day: 'Thu', hours: 3.5, percent: 88 },
  { day: 'Fri', hours: 2.8, percent: 70 },
  { day: 'Sat', hours: 4.0, percent: 100 },
  { day: 'Sun', hours: 2.5, percent: 63 }
];

export const todayGoalData = {
  targetLessons: 4,
  completedLessons: 3,
  streakDays: 7
};