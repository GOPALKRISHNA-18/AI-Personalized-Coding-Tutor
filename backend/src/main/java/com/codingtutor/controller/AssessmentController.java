package com.codingtutor.controller;
import com.codingtutor.dto.AssessmentRequest;
import com.codingtutor.entity.Assessment;
import com.codingtutor.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/assessments")
public class AssessmentController 
{
    @Autowired
    private AssessmentService assessmentService;
    @PostMapping
    public ResponseEntity<Assessment> submitAssessment(@RequestBody AssessmentRequest req)
    {
        Assessment assessment = assessmentService.submitAssessment(req.getUserId(), req.getLanguage(), req.getScore());
        return ResponseEntity.ok(assessment);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Assessment>> getAssessmentsByUser(@PathVariable Long userId) 
    {
        List<Assessment> list = assessmentService.getAssessmentsByUser(userId);
        return ResponseEntity.ok(list);
    }
}
