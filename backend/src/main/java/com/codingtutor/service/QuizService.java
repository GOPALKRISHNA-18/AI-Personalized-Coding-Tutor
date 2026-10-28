package com.codingtutor.service;

import com.codingtutor.dto.QuizSubmitRequest;
import com.codingtutor.dto.QuizSubmitResponse;
import com.codingtutor.entity.Quiz;
import com.codingtutor.entity.QuizQuestion;
import com.codingtutor.entity.QuizResult;
import com.codingtutor.repository.QuizQuestionRepository;
import com.codingtutor.repository.QuizRepository;
import com.codingtutor.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private QuizQuestionRepository questionRepo;

    @Autowired
    private QuizResultRepository resultRepo;

    public List<Quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with id: " + id));
    }

    public List<QuizQuestion> getQuestionsByQuizId(Long quizId) {
        return questionRepo.findByQuizIdOrderByIdAsc(quizId);
    }

    public QuizSubmitResponse submitQuiz(QuizSubmitRequest req) {
        List<QuizQuestion> questions = questionRepo.findByQuizIdOrderByIdAsc(req.getQuizId());
        int total = questions.size();
        int correct = 0;
        Map<Long, String> correctAnswers = new HashMap<>();

        Map<Long, String> userAnswers = req.getAnswers() != null ? req.getAnswers() : new HashMap<>();
        for (QuizQuestion q : questions) {
            correctAnswers.put(q.getId(), q.getCorrectOption());
            String userAns = userAnswers.get(q.getId());
            if (userAns != null && userAns.equalsIgnoreCase(q.getCorrectOption())) {
                correct++;
            }
        }

        int score = total > 0 ? (int) Math.round(((double) correct / total) * 100) : 0;
        QuizResult result = new QuizResult(req.getUserId(), req.getQuizId(), score);
        resultRepo.save(result);

        return new QuizSubmitResponse(req.getQuizId(), score, total, correct, correctAnswers);
    }

    public List<QuizResult> getQuizResultsByUser(Long userId) {
        return resultRepo.findByUserIdOrderByTakenAtDesc(userId);
    }
}
