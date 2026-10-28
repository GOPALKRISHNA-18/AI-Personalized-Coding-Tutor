package com.codingtutor.dto;
public class AssessmentRequest
{
    private Long userId;
    private String language;
    private Integer score;
    public AssessmentRequest() 
    {
    }
    public Long getUserId()
    {
        return userId;
    }
    public void setUserId(Long userId) 
    {
        this.userId = userId;
    }

    public String getLanguage() 
    {
        return language;
    }
    public void setLanguage(String language) 
    {
        this.language = language;
    }
    public Integer getScore() 
    {
        return score;
    }
    public void setScore(Integer score) 
    {
        this.score = score;
    }
}
