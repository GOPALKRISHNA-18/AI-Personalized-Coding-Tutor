package com.codingtutor.service;

import com.codingtutor.dto.TutorAskResponse;
import com.codingtutor.dto.TutorQuestionDto;
import com.codingtutor.entity.ChatMessage;
import com.codingtutor.entity.TutorQuestion;
import com.codingtutor.repository.ChatMessageRepository;
import com.codingtutor.repository.TutorQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatRepo;

    @Autowired
    private TutorQuestionRepository tutorQuestionRepo;

    @Autowired
    private AiService aiService;

    public ChatMessage saveMessage(Long userId, String sender, String message) {
        ChatMessage msg = new ChatMessage(userId, sender, message);
        return chatRepo.save(msg);
    }

    public List<TutorQuestionDto> getTutorQuestions() {
        List<TutorQuestion> list = tutorQuestionRepo.findAllByOrderByIdAsc();
        List<TutorQuestionDto> dtos = new ArrayList<>();
        for (TutorQuestion q : list) {
            dtos.add(new TutorQuestionDto(q.getId(), q.getCategory(), q.getQuestion()));
        }
        return dtos;
    }

    public TutorAskResponse askTutor(Long userId, String message) {
        Long uid = (userId != null && userId > 0) ? userId : 1L;
        List<TutorQuestion> all = tutorQuestionRepo.findAllByOrderByIdAsc();
        String cleanedMsg = cleanText(message);
        TutorQuestion matched = null;

        // 1. Exact or partial match in pre-seeded tutor questions
        for (TutorQuestion q : all) {
            if (cleanText(q.getQuestion()).equals(cleanedMsg)) {
                matched = q;
                break;
            }
        }

        if (matched == null && cleanedMsg.length() >= 4) {
            for (TutorQuestion q : all) {
                String cleanedQ = cleanText(q.getQuestion());
                if (cleanedMsg.contains(cleanedQ) || cleanedQ.contains(cleanedMsg)) {
                    matched = q;
                    break;
                }
            }
        }

        if (matched == null) {
            String[] keywords = {
                "javascript", "c++", "python", "java", "variable", "loop",
                "function", "array", "oop", "hint", "assessment", "progress",
                "editor", "level"
            };
            for (String kw : keywords) {
                if (containsKeyword(cleanedMsg, kw)) {
                    matched = findByTopic(all, kw);
                    if (matched != null) {
                        break;
                    }
                }
            }
            if (matched == null && (cleanedMsg.matches(".*\\bc\\b.*") || cleanedMsg.contains("c language"))) {
                matched = findByTopic(all, "c language");
            }
        }

        String reply;
        String exampleCode = null;
        String exampleLanguage = null;

        if (matched != null) {
            reply = matched.getAnswer();
            exampleCode = matched.getExampleCode();
            exampleLanguage = matched.getExampleLanguage();
        } else {
            String aiReply = null;
            try {
                aiReply = aiService.chatReply(message);
            } catch (Exception ex) {
                aiReply = null;
            }

            if (aiReply != null && !aiReply.trim().isEmpty()) {
                reply = aiReply;
            } else {
                // Intelligent fallback generator
                TutorAskResponse dynamicResp = generateSmartFallbackReply(message, cleanedMsg);
                reply = dynamicResp.getReply();
                exampleCode = dynamicResp.getExampleCode();
                exampleLanguage = dynamicResp.getExampleLanguage();
            }
        }

        saveMessage(uid, "user", message);
        saveMessage(uid, "tutor", reply);

        return new TutorAskResponse(reply, exampleCode, exampleLanguage);
    }

    private TutorAskResponse generateSmartFallbackReply(String rawMessage, String cleaned) {
        if (cleaned.contains("hello") || cleaned.contains("hi") || cleaned.contains("hey")) {
            return new TutorAskResponse(
                "Hello! 👋 I am your AI Personalized Coding Tutor. I can help explain programming concepts, debug tricky code snippets, analyze Big-O time complexity, or provide practice guidance across Python, Java, JavaScript, C, and C++. What would you like to explore today?",
                null,
                null
            );
        }

        if (cleaned.contains("time complexity") || cleaned.contains("big o") || cleaned.contains("space complexity")) {
            return new TutorAskResponse(
                "Big-O notation measures how an algorithm's runtime or memory consumption scales as input size (n) grows.\n\n" +
                "• **O(1) - Constant Time**: Accessing an array index or hash map lookup.\n" +
                "• **O(log n) - Logarithmic Time**: Binary Search on sorted datasets.\n" +
                "• **O(n) - Linear Time**: A single loop through an array.\n" +
                "• **O(n log n) - Linearithmic Time**: Efficient sorting (Merge Sort, Quick Sort).\n" +
                "• **O(n²) - Quadratic Time**: Nested loops over the same array.",
                "def binary_search(arr, target):\n    # O(log n) time complexity\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
                "Python"
            );
        }

        if (cleaned.contains("recursion") || cleaned.contains("recursive")) {
            return new TutorAskResponse(
                "Recursion is a problem-solving technique where a function calls itself to solve smaller subproblems of the same type.\n\n" +
                "Every valid recursive function must have two critical elements:\n" +
                "1. **Base Case**: A stopping condition that prevents infinite call-stack recursion.\n" +
                "2. **Recursive Step**: Moving toward the base case by calling the function with smaller inputs.",
                "def factorial(n):\n    # Base Case\n    if n <= 1:\n        return 1\n    # Recursive Step\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120",
                "Python"
            );
        }

        if (cleaned.contains("stack") || cleaned.contains("queue")) {
            return new TutorAskResponse(
                "Stacks and Queues are fundamental linear data structures:\n\n" +
                "• **Stack (LIFO - Last In, First Out)**: The last item added is the first one removed. Common uses include function call stacks, undo mechanisms, and bracket validation.\n" +
                "• **Queue (FIFO - First In, First Out)**: The first item added is the first one removed. Common uses include printer queues and Breadth-First Search (BFS).",
                "# Stack in Python using list\nstack = []\nstack.append(10)  # Push\nstack.append(20)\ntop = stack.pop() # Pop -> 20\n\n# Queue in Python using deque\nfrom collections import deque\nqueue = deque()\nqueue.append(10)      # Enqueue\nqueue.append(20)\nfirst = queue.popleft() # Dequeue -> 10",
                "Python"
            );
        }

        if (cleaned.contains("debug") || cleaned.contains("error") || cleaned.contains("fix") || cleaned.contains("why")) {
            return new TutorAskResponse(
                "When debugging code, follow this systematic approach:\n\n" +
                "1. **Inspect the Error Message**: Look closely at the file name, line number, and error type (e.g. `IndexOutOfBounds`, `TypeError`, `IndentationError`).\n" +
                "2. **Trace Variables**: Print intermediate variable values before and after conditional checks.\n" +
                "3. **Check Edge Cases**: Check empty arrays, single-item collections, 0 or negative numbers, and boundary loop conditions (e.g. `<` vs `<=`).\n\n" +
                "Feel free to paste your code snippet here, and I will help pinpoint the bug!",
                "# Tip: Defensive null/empty check example\ndef safe_average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)",
                "Python"
            );
        }

        return new TutorAskResponse(
            "Great question! In programming, breaking problems into modular, testable steps is the key to writing clean and bug-free code.\n\n" +
            "Could you specify which language (Python, Java, JavaScript, C++, or C) you would like to explore, or paste a code snippet you are currently working on? You can also pick any topic from the question list on the left.",
            "// Example: Clean modular function in JavaScript\nfunction calculateDiscount(price, rate) {\n    if (price < 0 || rate < 0) return 0;\n    return price * (1 - rate);\n}\n\nconsole.log(calculateDiscount(100, 0.15)); // 85",
            "JavaScript"
        );
    }

    public List<ChatMessage> getHistory(Long userId) {
        Long uid = (userId != null && userId > 0) ? userId : 1L;
        List<ChatMessage> list = chatRepo.findByUserIdOrderBySentAtAsc(uid);
        List<TutorQuestion> all = tutorQuestionRepo.findAll();
        for (ChatMessage msg : list) {
            if ("tutor".equalsIgnoreCase(msg.getSender())) {
                for (TutorQuestion q : all) {
                    if (q.getAnswer().equals(msg.getMessage())) {
                        msg.setExampleCode(q.getExampleCode());
                        msg.setExampleLanguage(q.getExampleLanguage());
                        break;
                    }
                }
            }
        }
        return list;
    }

    @Transactional
    public void clearHistory(Long userId) {
        Long uid = (userId != null && userId > 0) ? userId : 1L;
        chatRepo.deleteByUserId(uid);
    }

    private String cleanText(String text) {
        if (text == null) {
            return "";
        }
        String cleaned = text.toLowerCase().replaceAll("[^a-z0-9\\+\\s]", " ");
        return cleaned.replaceAll("\\s+", " ").trim();
    }

    private boolean containsKeyword(String text, String keyword) {
        if (text == null || keyword == null) {
            return false;
        }
        if (keyword.equals("c++")) {
            return text.contains("c++");
        }
        return text.matches(".*\\b" + keyword + "\\b.*") || text.contains(keyword);
    }

    private TutorQuestion findByTopic(List<TutorQuestion> list, String kw) {
        for (TutorQuestion q : list) {
            String qText = q.getQuestion().toLowerCase();
            if (kw.equals("java")) {
                if (qText.contains("java") && !qText.contains("javascript")) {
                    return q;
                }
            } else if (kw.equals("c language")) {
                if (qText.contains("c language")) {
                    return q;
                }
            } else if (qText.contains(kw)) {
                return q;
            }
        }
        return null;
    }
}
