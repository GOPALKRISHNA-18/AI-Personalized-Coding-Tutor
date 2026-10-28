package com.codingtutor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "tutor_questions")
public class TutorQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 255)
    private String question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    @Column(name = "example_code", columnDefinition = "TEXT")
    private String exampleCode;

    @Column(name = "example_language", length = 30)
    private String exampleLanguage;

    public TutorQuestion() {
    }

    public TutorQuestion(String category, String question, String answer, String exampleCode, String exampleLanguage) {
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.exampleCode = exampleCode;
        this.exampleLanguage = exampleLanguage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getExampleCode() {
        return exampleCode;
    }

    public void setExampleCode(String exampleCode) {
        this.exampleCode = exampleCode;
    }

    public String getExampleLanguage() {
        return exampleLanguage;
    }

    public void setExampleLanguage(String exampleLanguage) {
        this.exampleLanguage = exampleLanguage;
    }
}
