export const assessmentQuestions = {
  Python: [
    {
      id: 1,
      topic: 'Data Types & Mutability',
      question: 'Which of the following data structures in Python is immutable?',
      options: ['List', 'Dictionary', 'Tuple', 'Set'],
      answer: 2,
      explanation: 'Tuples in Python cannot be modified after creation, making them immutable.'
    },
    {
      id: 2,
      topic: 'List Comprehension',
      question: 'What is the output of [x**2 for x in range(5) if x % 2 == 1]?',
      options: ['[0, 1, 4, 9, 16]', '[1, 9]', '[1, 4, 9]', '[0, 4, 16]'],
      answer: 1,
      explanation: 'Range(5) produces 0, 1, 2, 3, 4. Odd numbers are 1 and 3. Their squares are 1 and 9.'
    },
    {
      id: 3,
      topic: 'Memory & References',
      question: 'In Python, how is memory managed for variables and objects?',
      options: ['Manual malloc and free', 'Reference counting combined with a cyclic garbage collector', 'Stack allocation only', 'Automatic compile-time elimination'],
      answer: 1,
      explanation: 'CPython utilizes reference counting as its primary mechanism along with a generational cyclic garbage collector.'
    },
    {
      id: 4,
      topic: 'Complexity Analysis',
      question: 'What is the average time complexity of checking membership `x in s` if `s` is a Python set?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      answer: 0,
      explanation: 'Sets are implemented as hash tables in Python, yielding average O(1) lookup.'
    },
    {
      id: 5,
      topic: 'Generators & Iterators',
      question: 'What keyword is used to pause function execution and return a generator object?',
      options: ['return', 'yield', 'pause', 'await'],
      answer: 1,
      explanation: 'The `yield` statement suspends execution and returns an iterator item to the caller.'
    },
    {
      id: 6,
      topic: 'Object-Oriented Programming',
      question: 'Which special method initializes a newly instantiated object in a class?',
      options: ['__create__', '__new__', '__init__', '__start__'],
      answer: 2,
      explanation: '__init__ is the standard initializer called right after an object is constructed.'
    },
    {
      id: 7,
      topic: 'Decorators',
      question: 'What is a decorator function in Python?',
      options: ['A function that modifies the visual styles in terminal', 'A function that takes another function as an argument and extends its behavior', 'A syntax error checker', 'A database wrapper'],
      answer: 1,
      explanation: 'A decorator takes a callable and wraps it to alter or enhance its behavior without changing its source code.'
    },
    {
      id: 8,
      topic: 'Exception Handling',
      question: 'Which block in Python always executes regardless of whether an exception occurred?',
      options: ['except', 'else', 'finally', 'catch'],
      answer: 2,
      explanation: 'The `finally` block is guaranteed to run, often used for resource cleanup.'
    },
    {
      id: 9,
      topic: 'Recursion & Call Stack',
      question: 'What built-in exception is raised when recursion exceeds the maximum depth limit?',
      options: ['StackOverflowException', 'RecursionError', 'DepthExceededError', 'MemoryError'],
      answer: 1,
      explanation: 'Python raises RecursionError when max recursion limit is reached.'
    },
    {
      id: 10,
      topic: 'Algorithms & Search',
      question: 'What prerequisite is required before performing Binary Search on an array?',
      options: ['Array must only contain integers', 'Array must be sorted', 'Array length must be a power of two', 'Array must have unique elements only'],
      answer: 1,
      explanation: 'Binary search requires monotonic sorted order to halve the search interval each step.'
    }
  ],
  Java: [
    {
      id: 1,
      topic: 'Memory Management',
      question: 'Where are object instances allocated in Java virtual memory?',
      options: ['Heap Memory', 'Stack Memory', 'Metaspace only', 'Registers'],
      answer: 0,
      explanation: 'All object instances in Java reside on the Heap.'
    },
    {
      id: 2,
      topic: 'OOP & Interfaces',
      question: 'Can a Java class implement multiple interfaces?',
      options: ['No, multiple inheritance is completely unsupported', 'Yes, classes can implement multiple interfaces', 'Only if all methods are static', 'Only starting in Java 21'],
      answer: 1,
      explanation: 'Java permits multiple interface implementation while restricting single class inheritance.'
    },
    {
      id: 3,
      topic: 'Collections Framework',
      question: 'Which collection maintains insertion order while offering O(1) lookup?',
      options: ['HashMap', 'TreeMap', 'LinkedHashMap', 'PriorityQueue'],
      answer: 2,
      explanation: 'LinkedHashMap maintains a doubly-linked list running through all of its entries.'
    },
    {
      id: 4,
      topic: 'Multithreading',
      question: 'What does the `volatile` keyword guarantee in Java?',
      options: ['Atomic increments', 'Visibility of changes across threads', 'Thread locking', 'Serial execution'],
      answer: 1,
      explanation: 'Volatile guarantees that reads and writes go directly to main memory, ensuring cross-thread visibility.'
    },
    {
      id: 5,
      topic: 'Complexity Analysis',
      question: 'What is the worst-case time complexity of inserting into a TreeMap?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: 'TreeMap is backed by a Red-Black tree guaranteeing O(log n) insertions.'
    },
    {
      id: 6,
      topic: 'Exceptions',
      question: 'Which of the following is an unchecked exception in Java?',
      options: ['IOException', 'SQLException', 'NullPointerException', 'ClassNotFoundException'],
      answer: 2,
      explanation: 'NullPointerException extends RuntimeException and is an unchecked exception.'
    },
    {
      id: 7,
      topic: 'Generics',
      question: 'What happens to generic type parameters at runtime due to type erasure?',
      options: ['They are replaced by their bounds or Object', 'They remain fully intact in JVM bytecode', 'They cause runtime crashes', 'They convert to dynamic pointers'],
      answer: 0,
      explanation: 'Java compiler translates generics by replacing types with their raw bounds (type erasure).'
    },
    {
      id: 8,
      topic: 'String Immutability',
      question: 'Why are String objects immutable in Java?',
      options: ['For string pooling, caching hash codes, and security', 'Because primitive types are immutable', 'To avoid garbage collection', 'Java does not support mutable data'],
      answer: 0,
      explanation: 'String pool caching, security tokens, and thread safety require immutable strings.'
    },
    {
      id: 9,
      topic: 'Streams API',
      question: 'Which stream operation is a terminal operation?',
      options: ['filter', 'map', 'collect', 'distinct'],
      answer: 2,
      explanation: 'collect() evaluates the stream pipeline and returns the final result.'
    },
    {
      id: 10,
      topic: 'Data Structures',
      question: 'What data structure backs Java\'s PriorityQueue by default?',
      options: ['Balanced AVL Tree', 'Binary Min-Heap', 'Doubly Linked List', 'Circular Buffer'],
      answer: 1,
      explanation: 'Java PriorityQueue is implemented as a priority min-heap array.'
    }
  ],
  JavaScript: [
    {
      id: 1,
      topic: 'Event Loop & Async',
      question: 'In what order are microtasks and macrotasks executed?',
      options: ['Macrotasks execute first, microtasks are executed once per minute', 'Microtask queue is emptied before the next macrotask runs', 'They execute concurrently on separate threads', 'Random order depending on OS clock'],
      answer: 1,
      explanation: 'Microtasks (Promise callbacks, queueMicrotask) run right after current execution and before next macrotask.'
    },
    {
      id: 2,
      topic: 'Scope & Closures',
      question: 'What is a closure in JavaScript?',
      options: ['A function bundled with references to its surrounding lexical state', 'A keyword that closes browser windows', 'A function with no arguments', 'An immediate return statement'],
      answer: 0,
      explanation: 'A closure retains access to outer variables even after the outer function has finished executing.'
    },
    {
      id: 3,
      topic: 'Data Types',
      question: 'What is `typeof NaN` in JavaScript?',
      options: ['undefined', 'nan', 'number', 'object'],
      answer: 2,
      explanation: 'In JavaScript, NaN represents Not-a-Number but its primitive type is \'number\'.'
    },
    {
      id: 4,
      topic: 'Prototypes & Inheritance',
      question: 'Where do JavaScript objects search when a property is not found on the instance itself?',
      options: ['Inside the global window object only', 'Along its prototype chain (__proto__)', 'In local storage', 'In the call stack frames'],
      answer: 1,
      explanation: 'Property lookups traverse up the prototype chain until found or null is reached.'
    },
    {
      id: 5,
      topic: 'ES6 Features',
      question: 'What is the difference between `let` and `var` regarding scope?',
      options: ['let is block-scoped, var is function-scoped', 'var is block-scoped, let is global', 'Both have identical scope', 'let can be redeclared in the same block'],
      answer: 0,
      explanation: 'let respects { } blocks while var hoists to function or global scope.'
    },
    {
      id: 6,
      topic: 'Array Methods',
      question: 'Which array method mutates the original array in place?',
      options: ['map', 'slice', 'splice', 'filter'],
      answer: 2,
      explanation: 'splice() modifies the original array by removing or replacing items.'
    },
    {
      id: 7,
      topic: 'Promises',
      question: 'What does `Promise.all()` do if any one promise in the iterable rejects?',
      options: ['Waits for all others before rejecting', 'Immediately rejects with that reason', 'Ignores the error and returns undefined', 'Resolves with null'],
      answer: 1,
      explanation: 'Promise.all() adopts fast-fail behavior, rejecting as soon as any promise fails.'
    },
    {
      id: 8,
      topic: 'Equality Comparison',
      question: 'What is the result of `[] == false` and `[] === false`?',
      options: ['true and true', 'true and false', 'false and false', 'false and true'],
      answer: 1,
      explanation: 'Coercion converts [] to empty string \'\' -> 0 == 0 (true), while strict equality checks types (object !== boolean).'
    },
    {
      id: 9,
      topic: 'DOM & Performance',
      question: 'What technique prevents rapid consecutive function calls triggered by scroll or resize?',
      options: ['Hydration', 'Debouncing / Throttling', 'Garbage collection', 'Memoization'],
      answer: 1,
      explanation: 'Debouncing and throttling rate-limit how frequently event listeners trigger execution.'
    },
    {
      id: 10,
      topic: 'Data Structures',
      question: 'What is the primary difference between a Map and a plain Object?',
      options: ['Maps can use any data type as keys and preserve insertion order', 'Objects are faster for deletion', 'Maps cannot be iterated', 'Objects can store functions as keys'],
      answer: 0,
      explanation: 'Map keys can be objects, functions, or primitives and maintain deterministic insertion order.'
    }
  ]
};

export const assessmentPerks = [
  { iconName: 'Clock', title: '15 Minutes', text: 'Timed quiz to measure problem solving speed' },
  { iconName: 'CheckCircle2', title: '10 Multiple Choice', text: 'Curated core concepts & complexity analysis' },
  { iconName: 'BarChart2', title: 'Instant Score', text: 'Calibrates learning path and starting tier' }
];