export const quizzesData = [
  {
    id: 'contest-1',
    title: 'Weekly Contest 1: Dynamic Programming',
    topic: 'Dynamic Programming',
    questionsCount: 5,
    timeLimit: 600,
    timeDisplay: '10 Mins',
    difficulty: 'Medium',
    participants: '1',
    questions: [
      {
        id: 1,
        question: 'What is the optimal subproblem equation for the 0/1 Knapsack problem?',
        options: [
          'dp[i][w] = dp[i-1][w]',
          'dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])',
          'dp[i][w] = min(dp[i-1][w], dp[i][w-1])',
          'dp[i][w] = dp[i-1][w] + dp[i][w-wt[i]]'
        ],
        answer: 1,
        explanation: 'In 0/1 Knapsack, for each item we choose the maximum between omitting the item or taking it and subtracting its weight from the capacity.'
      },
      {
        id: 2,
        question: 'Which approach solves the Fibonacci sequence with O(1) auxiliary space?',
        options: [
          'Top-down recursion without memoization',
          'Bottom-up iterative using two state variables',
          'Matrix exponentiation with O(N) space',
          'Recursion with a hash table'
        ],
        answer: 1,
        explanation: 'Iterative bottom-up only needs the previous two states (a, b), requiring O(1) extra space.'
      },
      {
        id: 3,
        question: 'What is the time complexity to find the Longest Increasing Subsequence using Patience Sorting & Binary Search?',
        options: [
          'O(N²)',
          'O(N log N)',
          'O(N)',
          'O(2^N)'
        ],
        answer: 1,
        explanation: 'Binary search on the tails array updates the smallest tail of all increasing subsequences of length i in O(log N), yielding O(N log N) total.'
      },
      {
        id: 4,
        question: 'In the Coin Change problem, what base case is returned when amount == 0?',
        options: [
          '0',
          '-1',
          'Infinity',
          '1'
        ],
        answer: 0,
        explanation: 'Zero coins are needed to make an amount of 0.'
      },
      {
        id: 5,
        question: 'What is the key difference between Memoization and Tabulation?',
        options: [
          'Memoization is top-down using call stack cache; Tabulation is bottom-up iterative table filling',
          'Memoization cannot solve overlapping subproblems',
          'Tabulation only works for sorting algorithms',
          'There is no difference'
        ],
        answer: 0,
        explanation: 'Memoization caches results in recursive calls top-down; Tabulation systematically fills a DP table bottom-up.'
      }
    ]
  },
  {
    id: 'contest-2',
    title: 'Biweekly Contest 1: Trees & Graphs',
    topic: 'Graph Traversal & Trees',
    questionsCount: 4,
    timeLimit: 480,
    timeDisplay: '8 Mins',
    difficulty: 'Medium',
    participants: '1',
    questions: [
      {
        id: 1,
        question: 'Which algorithm finds the shortest path on an unweighted graph?',
        options: [
          'Breadth-First Search (BFS)',
          'Depth-First Search (DFS)',
          'Dijkstra with Priority Queue',
          'Floyd-Warshall'
        ],
        answer: 0,
        explanation: 'BFS explores layer by layer, guaranteeing the shortest path in unweighted graphs.'
      },
      {
        id: 2,
        question: 'In a Binary Search Tree (BST), which traversal produces strictly ascending sorted keys?',
        options: [
          'Pre-order Traversal',
          'Post-order Traversal',
          'In-order Traversal',
          'Level-order Traversal'
        ],
        answer: 2,
        explanation: 'In-order traversal visits (Left, Root, Right), visiting keys in ascending order.'
      },
      {
        id: 3,
        question: 'What data structure does Prim\'s algorithm use for minimum spanning tree extraction?',
        options: [
          'Min-Heap / Priority Queue',
          'Stack',
          'Circular Array',
          'Hash Set'
        ],
        answer: 0,
        explanation: 'Prim\'s uses a Min-Heap to extract the minimum weight incident edge at each iteration.'
      },
      {
        id: 4,
        question: 'What is the time complexity of detecting cycles in a directed graph using Kahn\'s Algorithm (Topological Sort)?',
        options: [
          'O(V + E)',
          'O(V²)',
          'O(E log V)',
          'O(V * E)'
        ],
        answer: 0,
        explanation: 'Kahn\'s algorithm checks in-degrees and processes each vertex and edge once in O(V + E) time.'
      }
    ]
  },
  {
    id: 'contest-3',
    title: 'Speed Blitz: Arrays & Two Pointers',
    topic: 'Array Manipulation',
    questionsCount: 4,
    timeLimit: 360,
    timeDisplay: '6 Mins',
    difficulty: 'Easy',
    participants: '6,150',
    questions: [
      {
        id: 1,
        question: 'When applying the Two-Pointer convergence technique on an array, what property is usually required?',
        options: [
          'Sorted order',
          'Negative values only',
          'Power of two length',
          'Prime elements only'
        ],
        answer: 0,
        explanation: 'Sorting allows pointers to move monotonically inwards based on target comparison.'
      },
      {
        id: 2,
        question: 'What is the space complexity of Kadane\'s algorithm for Maximum Subarray?',
        options: [
          'O(1)',
          'O(N)',
          'O(log N)',
          'O(N²)'
        ],
        answer: 0,
        explanation: 'Kadane\'s algorithm only tracks max_so_far and current_max, consuming O(1) space.'
      },
      {
        id: 3,
        question: 'What is the time complexity of reversing an array in-place using two pointers?',
        options: [
          'O(N)',
          'O(N log N)',
          'O(1)',
          'O(N²)'
        ],
        answer: 0,
        explanation: 'Swapping elements from both ends meets in the middle in N/2 steps, which is O(N).'
      },
      {
        id: 4,
        question: 'Which data structure provides O(1) amortized insertion at both the front and back?',
        options: [
          'Deque (Double-Ended Queue)',
          'Binary Heap',
          'Singly Linked List without tail',
          'Sorted Array'
        ],
        answer: 0,
        explanation: 'A Deque is optimized for pushing and popping at both boundaries in O(1) time.'
      }
    ]
  }
];

export const leaderboardData = [
  { rank: 1, name: 'Gopal Krishna', country: 'IN', score: '5 / 5', time: '2m 14s', rating: '1,200', isUser: true }
];