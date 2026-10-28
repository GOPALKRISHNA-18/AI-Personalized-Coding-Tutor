package com.codingtutor.service;

import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.entity.LearningPath;
import com.codingtutor.repository.LearningPathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class LearningPathService {

    @Autowired
    private LearningPathRepository pathRepo;

    @Autowired(required = false)
    private LearnerProfileService profileService;

    public List<LearningPath> getLearningPathByUser(Long userId) {
        List<LearningPath> list = pathRepo.findByUserIdOrderByOrderNoAsc(userId);
        if (list == null || list.isEmpty()) {
            return generateDefaultPathForUser(userId);
        }
        return list;
    }

    public List<LearningPath> generateDefaultPathForUser(Long userId) {
        String lang = "Python";
        String level = "Beginner";
        if (profileService != null) {
            LearnerProfile profile = profileService.getProfileByUserId(userId);
            if (profile != null) {
                if (profile.getPreferredLanguage() != null && !profile.getPreferredLanguage().isEmpty()) {
                    lang = profile.getPreferredLanguage();
                }
                if (profile.getSkillLevel() != null && !profile.getSkillLevel().isEmpty()) {
                    level = profile.getSkillLevel();
                }
            }
        }

        List<LearningPath> newPaths = new ArrayList<>();
        if ("Advanced".equalsIgnoreCase(level)) {
            newPaths.add(new LearningPath(userId, "Advanced Data Structures & Trees in " + lang, "In Progress", 1));
            newPaths.add(new LearningPath(userId, "Dynamic Programming & Optimization", "Locked", 2));
            newPaths.add(new LearningPath(userId, "Graph Algorithms & BFS/DFS", "Locked", 3));
            newPaths.add(new LearningPath(userId, "System Design & Memory Management", "Locked", 4));
            newPaths.add(new LearningPath(userId, "Concurrency & Multi-Threading", "Locked", 5));
            newPaths.add(new LearningPath(userId, "Capstone Algorithmic Challenge", "Locked", 6));
        } else if ("Intermediate".equalsIgnoreCase(level)) {
            newPaths.add(new LearningPath(userId, "Lists, Dictionaries & Collections in " + lang, "In Progress", 1));
            newPaths.add(new LearningPath(userId, "Object-Oriented Programming & Classes", "Locked", 2));
            newPaths.add(new LearningPath(userId, "Recursion & Divide-and-Conquer", "Locked", 3));
            newPaths.add(new LearningPath(userId, "Searching & Sorting Fundamentals", "Locked", 4));
            newPaths.add(new LearningPath(userId, "Two Pointers & Sliding Window", "Locked", 5));
            newPaths.add(new LearningPath(userId, "Error Handling & File Streams", "Locked", 6));
            newPaths.add(new LearningPath(userId, "Intermediate Problem Solving Challenge", "Locked", 7));
        } else {
            newPaths.add(new LearningPath(userId, "Syntax, Variables & Data Types in " + lang, "In Progress", 1));
            newPaths.add(new LearningPath(userId, "Conditionals, Logic & Branching", "Locked", 2));
            newPaths.add(new LearningPath(userId, "Loops & Iterative Execution", "Locked", 3));
            newPaths.add(new LearningPath(userId, "Functions & Scope Management", "Locked", 4));
            newPaths.add(new LearningPath(userId, "Arrays & List Manipulation", "Locked", 5));
            newPaths.add(new LearningPath(userId, "Strings & Text Processing", "Locked", 6));
            newPaths.add(new LearningPath(userId, "Basic Problem Solving & Logic Building", "Locked", 7));
            newPaths.add(new LearningPath(userId, "Foundational Coding Milestone", "Locked", 8));
        }

        pathRepo.saveAll(newPaths);
        return pathRepo.findByUserIdOrderByOrderNoAsc(userId);
    }

    public LearningPath updateTopicStatus(Long id, String status) {
        LearningPath path = pathRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Learning path node not found with id: " + id));
        path.setStatus(status);
        return pathRepo.save(path);
    }

    public List<LearningPath> resetLearningPath(Long userId) {
        List<LearningPath> existing = pathRepo.findByUserIdOrderByOrderNoAsc(userId);
        if (existing != null && !existing.isEmpty()) {
            pathRepo.deleteAll(existing);
        }
        return generateDefaultPathForUser(userId);
    }

    public List<LearningPath> generateNextTopics(Long userId) {
        List<LearningPath> list = getLearningPathByUser(userId);
        for (int i = 0; i < list.size(); i++) {
            LearningPath current = list.get(i);
            if ("In Progress".equals(current.getStatus())) {
                current.setStatus("Completed");
                pathRepo.save(current);
                if (i + 1 < list.size()) {
                    LearningPath next = list.get(i + 1);
                    next.setStatus("In Progress");
                    pathRepo.save(next);
                }
                break;
            }
        }
        return pathRepo.findByUserIdOrderByOrderNoAsc(userId);
    }
}
