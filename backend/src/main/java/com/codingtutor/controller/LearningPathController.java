package com.codingtutor.controller;
import com.codingtutor.entity.LearningPath;
import com.codingtutor.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/learning-paths")
public class LearningPathController 
{
    @Autowired
    private LearningPathService pathService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningPath>> getLearningPathByUser(@PathVariable Long userId) 
    {
        List<LearningPath> list = pathService.getLearningPathByUser(userId);
        return ResponseEntity.ok(list);
    }
    @PutMapping("/{id}")
    public ResponseEntity<LearningPath> updateTopicStatus(@PathVariable Long id, @RequestBody Map<String, String> body) 
    {
        String status = body.getOrDefault("status", "Completed");
        LearningPath updated = pathService.updateTopicStatus(id, status);
        return ResponseEntity.ok(updated);
    }
    @PostMapping("/reset/{userId}")
    public ResponseEntity<List<LearningPath>> resetLearningPath(@PathVariable Long userId) 
    {
        List<LearningPath> list = pathService.resetLearningPath(userId);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/generate/{userId}")
    public ResponseEntity<List<LearningPath>> generateNextTopics(@PathVariable Long userId) 
    {
        List<LearningPath> list = pathService.generateNextTopics(userId);
        return ResponseEntity.ok(list);
    }
}
