package com.codingtutor.dto;
import java.util.Map;
public class QuizSubmitResponse
{
    private Long quizId;
    private Integer score;
    private Integer totalQuestions;
    private Integer correctCount;
    private Map<Long, String> correctAnswers;
    public QuizSubmitResponse() 
    {
    }
    public QuizSubmitResponse(Long quizId, Integer score, Integer totalQuestions, Integer correctCount, Map<Long, String> correctAnswers) {
        this.quizId = quizId;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.correctCount = correctCount;
        this.correctAnswers = correctAnswers;
    }
    public Long getQuizId() 
    {
        return quizId;
    }
    public void setQuizId(Long quizId) 
    {
        this.quizId = quizId;
    }
    public Integer getScore() 
    {
        return score;
    }
    public void setScore(Integer score) 
    {
        this.score = score;
    }
    public Integer getTotalQuestions() 
    {
        return totalQuestions;
    }
    public void setTotalQuestions(Integer totalQuestions) 
    {
        this.totalQuestions = totalQuestions;
    }

    public Integer getCorrectCount() {
        return correctCount;
    }

    public void setCorrectCount(Integer correctCount) {
        this.correctCount = correctCount;
    }

    public Map<Long, String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Map<Long, String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}
