package com.codingtutor.dto;

public class TutorQuestionDto {

    private Long id;
    private String category;
    private String question;

    public TutorQuestionDto() {
    }

    public TutorQuestionDto(Long id, String category, String question) {
        this.id = id;
        this.category = category;
        this.question = question;
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
}
