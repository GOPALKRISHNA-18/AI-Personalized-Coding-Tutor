CREATE DATABASE IF NOT EXISTS ai_coding_tutor;
USE ai_coding_tutor;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learner_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    preferred_language VARCHAR(50),
    skill_level VARCHAR(20) DEFAULT 'Beginner',
    goal VARCHAR(255),
    joined_date VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assessments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    language VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    level_result VARCHAR(20),
    taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    language VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    starter_code TEXT,
    topic VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    code TEXT,
    status VARCHAR(20),
    score INT DEFAULT 0,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exercise_id BIGINT NOT NULL,
    hint_level INT NOT NULL,
    hint_text TEXT NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    language VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    quiz_id BIGINT NOT NULL,
    score INT NOT NULL,
    taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_paths (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Locked',
    order_no INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    sender VARCHAR(10) NOT NULL,
    message TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    language VARCHAR(50) NOT NULL,
    completed_count INT DEFAULT 0,
    total_score INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tutor_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    example_code TEXT,
    example_language VARCHAR(30)
);

INSERT INTO tutor_questions (category, question, answer, example_code, example_language) VALUES
('Language', 'What is C language?', 'C is a general purpose programming language created by Dennis Ritchie in 1972. It is fast and close to the hardware, so it is used for operating systems, embedded systems, and drivers. C is a good first language to understand how memory, variables, and functions really work. A C program starts running from the main function.', '#include <stdio.h>\nint main() {\n    printf("Hello, C");\n    return 0;\n}', 'C'),
('Language', 'What is Java?', 'Java is an object oriented programming language released in 1995 by Sun Microsystems. Java code is compiled into bytecode that runs on the Java Virtual Machine, so the same program works on Windows, Mac, and Linux. It is used for web backends, Android apps, and enterprise software. The backend of this project is built with Java and Spring Boot.', 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java");\n    }\n}', 'Java'),
('Language', 'What is Python?', 'Python is a simple and easy to read programming language created by Guido van Rossum in 1991. It uses indentation instead of curly braces, so the code looks clean. Python is used for data science, automation, web development, and AI. It is a very good first language for beginners.', 'for i in range(3):\n    print("Hello, Python", i)', 'Python'),
('Language', 'What is JavaScript?', 'JavaScript is the programming language of the web, created by Brendan Eich in 1995. It runs in every browser and makes web pages interactive. With Node.js it can also run on a server. The frontend of this project is built with React, which is a JavaScript library.', 'const name = "JavaScript";\nconsole.log("Hello, " + name);', 'JavaScript'),
('Language', 'What is C++?', 'C++ is an extension of C created by Bjarne Stroustrup. It adds classes and objects to C while keeping the speed. It is used for games, browsers, and high performance software.', '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++";\n    return 0;\n}', 'C++'),
('Concept', 'What is a variable?', 'A variable is a named place in memory that stores a value. You give it a name, a type (in languages like Java and C), and a value. The value can change while the program runs.', 'int age = 20;\nString name = "Ravi";\nage = 21;', 'Java'),
('Concept', 'What is a loop?', 'A loop repeats a block of code many times. A for loop is used when you know how many times to repeat. A while loop is used when you repeat until a condition becomes false.', 'for i in range(1, 6):\n    print(i)', 'Python'),
('Concept', 'What is a function?', 'A function is a block of code with a name. You write it once and call it many times. It can take input values (parameters) and give back a result (return value).', 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));', 'JavaScript'),
('Concept', 'What is an array?', 'An array stores many values of the same type in one variable. Each value has an index, and the index starts from 0. Arrays are used to store lists like marks or names.', 'int[] marks = {70, 85, 90};\nSystem.out.println(marks[1]);', 'Java'),
('Concept', 'What is OOP?', 'OOP means Object Oriented Programming. Code is organized into classes (blueprints) and objects (real items made from the blueprint). Its four main ideas are encapsulation, inheritance, polymorphism, and abstraction.', 'class Student {\n    String name;\n    void show() {\n        System.out.println(name);\n    }\n}', 'Java'),
('Project', 'What is AI Personalized Coding Tutor?', 'It is a learning platform that acts as your personal coding tutor. It checks your skill level, gives you exercises, hints, and explanations, and builds a learning path based on how you perform. Example: you register, take the skill assessment, get the Beginner level, and then receive Beginner exercises.', NULL, NULL),
('Project', 'How does the skill assessment work?', 'You choose a language and answer multiple choice questions. Your score decides your level: below 40 is Beginner, 40 to 74 is Intermediate, and 75 and above is Advanced. Example: if you score 80 in Java, your Java level becomes Advanced and the exercises become harder.', NULL, NULL),
('Project', 'How do hints work?', 'Each exercise has three hint levels. Hint 1 gives a small direction, hint 2 gives a stronger clue, and hint 3 explains the approach, but none of them show the full solution. Example: for Reverse a String, hint 1 tells you to think about reading the characters from the end.', NULL, NULL),
('Project', 'What are the difficulty levels?', 'There are three levels: Beginner for basics like variables and loops, Intermediate for arrays, functions, and OOP, and Advanced for problem solving and data structures. Example: Print numbers 1 to 10 is Beginner, while Find the longest word in a sentence is Intermediate.', NULL, NULL),
('Project', 'How do I use the code editor?', 'Open an exercise, choose the language, and write your code in the editor. Use Run to test it, Get Hint if you are stuck, Explain Step by Step to understand the problem, and Submit when you are ready. Example: write your code for Find Factorial, click Run, read the errors on the right side, fix them, and then Submit.', NULL, NULL),
('Project', 'How is my progress tracked?', 'Every submission, quiz score, and assessment result is saved. The Progress page shows your scores and completed challenges, and the Dashboard shows charts for each language. Example: after you submit 3 correct exercises in Python, your Python completed count becomes 3 and the chart updates.', NULL, NULL);

INSERT INTO exercises (id, title, description, language, difficulty, starter_code, topic) VALUES
(1, 'Two Sum & Hash Maps', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Python', 'Easy', 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in seen:\n                return [seen[diff], i]\n            seen[n] = i\n        return []', 'Arrays & Hashing'),
(2, 'Add Two Numbers with Carry', 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.', 'Java', 'Medium', 'class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        int carry = 0;\n        while (l1 != null || l2 != null || carry != 0) {\n            int sum = carry;\n            if (l1 != null) { sum += l1.val; l1 = l1.next; }\n            if (l2 != null) { sum += l2.val; l2 = l2.next; }\n            carry = sum / 10;\n            curr.next = new ListNode(sum % 10);\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n}', 'Linked List'),
(3, 'Longest Substring Without Repeating Characters', 'Given a string s, find the length of the longest substring without duplicate characters.', 'JavaScript', 'Medium', 'var lengthOfLongestSubstring = function(s) {\n    const seen = new Map();\n    let left = 0, ans = 0;\n    for (let right = 0; right < s.length; right++) {\n        const ch = s[right];\n        if (seen.has(ch) && seen.get(ch) >= left) {\n            left = seen.get(ch) + 1;\n        }\n        seen.set(ch, right);\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n};', 'Strings'),
(4, 'Pointer Arithmetic & Array Reversal', 'Implement in-place array reversal using raw pointer traversal in C.', 'C', 'Medium', '#include <stdio.h>\nvoid reverseArray(int* arr, int size) {\n    int* start = arr;\n    int* end = arr + size - 1;\n    while (start < end) {\n        int temp = *start;\n        *start = *end;\n        *end = temp;\n        start++;\n        end--;\n    }\n}', 'Pointers & Memory'),
(5, 'Valid Parentheses with Monotonic Stack', 'Given a string s containing just the characters brackets, determine if the input string is valid.', 'Python', 'Easy', 'class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else "#"\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack', 'Stack'),
(6, 'Dynamic Memory Allocation via Malloc', 'Allocate dynamic integer matrix in C memory, populate with values, and ensure free release without leaks.', 'C', 'Hard', '#include <stdlib.h>\nint* createArray(int n) {\n    int* ptr = (int*)malloc(n * sizeof(int));\n    return ptr;\n}', 'Pointers & Memory'),
(7, 'Merge Two Sorted Linked Lists', 'Merge two sorted linked lists into one single sorted list and return its head.', 'Java', 'Easy', 'class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val < list2.val) {\n                curr.next = list1;\n                list1 = list1.next;\n            } else {\n                curr.next = list2;\n                list2 = list2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n}', 'Linked List'),
(8, 'Async Promises & Microtask Event Loop', 'Create asynchronous pipeline using Promises and async/await queue in JavaScript.', 'JavaScript', 'Medium', 'async function processTasks(tasks) {\n    const results = [];\n    for (const task of tasks) {\n        const res = await task();\n        results.push(res);\n    }\n    return results;\n}', 'Async & Functions'),
(9, 'Binary Search Tree Insertion & Search', 'Insert target value into Binary Search Tree respecting left smaller and right greater properties.', 'Java', 'Medium', 'class Solution {\n    public TreeNode insertIntoBST(TreeNode root, int val) {\n        if (root == null) return new TreeNode(val);\n        if (val < root.val) root.left = insertIntoBST(root.left, val);\n        else root.right = insertIntoBST(root.right, val);\n        return root;\n    }\n}', 'Trees'),
(10, 'Reverse a String In-Place using Pointers', 'Reverse a null-terminated string in C using pointer arithmetic.', 'C', 'Easy', '#include <string.h>\nvoid reverseString(char* s) {\n    int len = strlen(s);\n    char* l = s;\n    char* r = s + len - 1;\n    while (l < r) {\n        char tmp = *l; *l = *r; *r = tmp;\n        l++; r--;\n    }\n}', 'Strings'),
(11, 'Sliding Window Maximum with Deque', 'Return maximum element within sliding window of size k moving across array from left to right.', 'Python', 'Hard', 'from collections import deque\nclass Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        q = deque()\n        res = []\n        for i, n in enumerate(nums):\n            while q and nums[q[-1]] < n:\n                q.pop()\n            q.append(i)\n            if q[0] == i - k:\n                q.popleft()\n            if i >= k - 1:\n                res.append(nums[q[0]])\n        return res', 'Arrays & Hashing'),
(12, 'OOP Inheritance, Interfaces & Polymorphism', 'Model vehicle hierarchy with abstract interface and concrete implementations.', 'Java', 'Easy', 'interface Vehicle {\n    void drive();\n}\nclass Car implements Vehicle {\n    public void drive() {\n        System.out.println("Driving car");\n    }\n}', 'Object-Oriented'),
(13, 'Lexical Scope & Function Closures', 'Demonstrate functional state persistence using JavaScript closure functions.', 'JavaScript', 'Medium', 'function createCounter(initial) {\n    let count = initial;\n    return {\n        inc: () => ++count,\n        get: () => count\n    };\n}', 'Async & Functions'),
(14, 'Linked List Fast & Slow Pointer Cycle Check', 'Detect if linked list contains a cycle using Floyd algorithm.', 'Python', 'Easy', 'class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            if slow == fast:\n                return True\n        return False', 'Linked List'),
(15, 'Matrix Transpose & 2D Bounds Verification', 'Calculate 2D matrix transpose in C validating rectangular row and col bounds.', 'C', 'Easy', 'void transpose(int rows, int cols, int src[rows][cols], int dst[cols][rows]) {\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++) {\n            dst[j][i] = src[i][j];\n        }\n    }\n}', 'Arrays & Hashing'),
(16, 'Climbing Stairs Dynamic Programming', 'Compute number of distinct ways to climb n stairs taking 1 or 2 steps each time.', 'JavaScript', 'Easy', 'var climbStairs = function(n) {\n    let a = 1, b = 1;\n    for (let i = 0; i < n - 1; i++) {\n        let temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n};', 'Dynamic Programming');
