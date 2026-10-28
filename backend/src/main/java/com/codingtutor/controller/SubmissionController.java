package com.codingtutor.controller;
import com.codingtutor.dto.RunCodeRequest;
import com.codingtutor.dto.RunCodeResponse;
import com.codingtutor.dto.SubmissionRequest;
import com.codingtutor.entity.Submission;
import com.codingtutor.service.SubmissionService;
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
@RequestMapping("/api/submissions")
public class SubmissionController
{
    @Autowired
    private SubmissionService submissionService;
    @PostMapping
    public ResponseEntity<Submission> submitCode(@RequestBody SubmissionRequest req)
    {
        Submission submission = submissionService.submitCode(req);
        return ResponseEntity.ok(submission);
    }
    @PostMapping("/run")
    public ResponseEntity<RunCodeResponse> runCode(@RequestBody RunCodeRequest req)
    {
        RunCodeResponse response = submissionService.runCode(req);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Submission>> getSubmissionsByUser(@PathVariable Long userId) 
    {
        List<Submission> list = submissionService.getSubmissionsByUser(userId);
        return ResponseEntity.ok(list);
    }
}
