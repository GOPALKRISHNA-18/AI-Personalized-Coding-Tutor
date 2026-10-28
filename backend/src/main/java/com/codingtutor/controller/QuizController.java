package com.codingtutor.controller;
import com.codingtutor.dto.QuizSubmitRequest;
import com.codingtutor.dto.QuizSubmitResponse;
import com.codingtutor.entity.Quiz;
import com.codingtutor.entity.QuizQuestion;
import com.codingtutor.entity.QuizResult;
import com.codingtutor.service.QuizService;
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
@RequestMapping("/api/quizzes")
public class QuizController 
{
    @Autowired
    private QuizService quizService;

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes()
    {
        List<Quiz> list = quizService.getAllQuizzes();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) 
    {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(quiz);
    }
    @GetMapping("/{id}/questions")
    public ResponseEntity<List<QuizQuestion>> getQuestionsByQuizId(@PathVariable Long id) 
    {
        List<QuizQuestion> questions = quizService.getQuestionsByQuizId(id);
        return ResponseEntity.ok(questions);
    }
    @PostMapping("/submit")
    public ResponseEntity<QuizSubmitResponse> submitQuiz(@RequestBody QuizSubmitRequest req) 
    {
        QuizSubmitResponse response = quizService.submitQuiz(req);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/results/user/{userId}")
    public ResponseEntity<List<QuizResult>> getQuizResultsByUser(@PathVariable Long userId)
    {
        List<QuizResult> list = quizService.getQuizResultsByUser(userId);
        return ResponseEntity.ok(list);
    }
}
