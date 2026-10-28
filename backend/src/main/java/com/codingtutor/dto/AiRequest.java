package com.codingtutor.dto;
public class AiRequest 
{
    private String message;
    private String code;
    private String language;
    private String title;
    private String skillLevel;
    private String topic;
    private String difficulty;
    public AiRequest() 
    {
    }
    public String getMessage() 
    {
        return message;
    }
    public void setMessage(String message)
    {
        this.message = message;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) 
    {
        this.code = code;
    }
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) 
    {
        this.language = language;
    }
    public String getTitle()
    {
        return title;
    }
    public void setTitle(String title) 
    {
        this.title = title;
    }

    public String getSkillLevel()
    {
        return skillLevel;
    }
    public void setSkillLevel(String skillLevel) 
    {
        this.skillLevel = skillLevel;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) 
    {
        this.topic = topic;
    }

    public String getDifficulty()
    {
        return difficulty;
    }

    public void setDifficulty(String difficulty) 
    {
        this.difficulty = difficulty;
    }
}
