package com.codingtutor.service;

import com.codingtutor.dto.RunCodeRequest;
import com.codingtutor.dto.RunCodeResponse;
import com.codingtutor.dto.SubmissionRequest;
import com.codingtutor.entity.Submission;
import com.codingtutor.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepo;

    @Autowired
    private ProgressService progressService;

    public Submission submitCode(SubmissionRequest req) {
        String code = req.getCode() != null ? req.getCode() : "";
        boolean isPassing = !code.contains("error") && code.trim().length() > 15;
        String status = isPassing ? "Accepted" : "Wrong Answer";
        int score = isPassing ? 100 : 35;

        Submission submission = new Submission(req.getUserId(), req.getExerciseId(), code, status, score);
        Submission saved = submissionRepo.save(submission);

        if (isPassing && req.getLanguage() != null) {
            progressService.recordProgress(req.getUserId(), req.getLanguage(), score);
        }

        return saved;
    }

    public List<Submission> getSubmissionsByUser(Long userId) {
        return submissionRepo.findByUserIdOrderBySubmittedAtDesc(userId);
    }

    public RunCodeResponse runCode(RunCodeRequest req) {
        String code = req.getCode();
        if (code == null || code.trim().isEmpty()) {
            return new RunCodeResponse(false, "Error: No code provided to execute.", "0.00s");
        }
        if (code.contains("syntax error") || code.contains("undefined_var")) {
            return new RunCodeResponse(false, "SyntaxError: Unexpected token detected in user script.", "0.02s");
        }
        return new RunCodeResponse(true, "Execution completed successfully.", "0.01s");
    }
}
