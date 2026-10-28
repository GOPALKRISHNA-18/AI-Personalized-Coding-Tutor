package com.codingtutor.controller;
import com.codingtutor.dto.AiRequest;
import com.codingtutor.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/ai")
public class AiController 
{
    @Autowired
    private AiService aiService;
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody AiRequest req)
    {
        String reply = aiService.chatReply(req.getMessage());
        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/explain")
    public ResponseEntity<List<Map<String, Object>>> explain(@RequestBody AiRequest req)
    {
        List<Map<String, Object>> steps = aiService.explainStepByStep(req.getTitle(), req.getCode(), req.getLanguage());
        return ResponseEntity.ok(steps);
    }
    @PostMapping("/errors")
    public ResponseEntity<Map<String, Object>> detectErrors(@RequestBody AiRequest req)
    {
        Map<String, Object> result = aiService.detectErrors(req.getCode(), req.getLanguage());
        return ResponseEntity.ok(result);
    }
    @PostMapping("/generate-exercise")
    public ResponseEntity<Map<String, Object>> generateExercise(@RequestBody AiRequest req)
    {
        Map<String, Object> exercise = aiService.generateExercise(req.getLanguage(), req.getSkillLevel());
        return ResponseEntity.ok(exercise);
    }
    @PostMapping("/generate-quiz")
    public ResponseEntity<Map<String, Object>> generateQuiz(@RequestBody AiRequest req) {
        Map<String, Object> quiz = aiService.generateQuiz(req.getTopic(), req.getLanguage(), req.getDifficulty());
        return ResponseEntity.ok(quiz);
    }
}
