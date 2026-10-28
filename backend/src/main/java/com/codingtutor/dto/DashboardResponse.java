package com.codingtutor.dto;
import java.util.List;
import java.util.Map;
public class DashboardResponse
{
    private String currentLevel;
    private Integer completedChallenges;
    private Integer averageScore;
    private Integer streak;
    private List<Map<String, Object>> scoreOverTime;
    private List<Map<String, Object>> skillByLanguage;
    public DashboardResponse()
    {
    }
    public DashboardResponse(String currentLevel, Integer completedChallenges, Integer averageScore, Integer streak, List<Map<String, Object>> scoreOverTime, List<Map<String, Object>> skillByLanguage) 
    {
        this.currentLevel = currentLevel;
        this.completedChallenges = completedChallenges;
        this.averageScore = averageScore;
        this.streak = streak;
        this.scoreOverTime = scoreOverTime;
        this.skillByLanguage = skillByLanguage;
    }
    public String getCurrentLevel() 
    {
        return currentLevel;
    }
    public void setCurrentLevel(String currentLevel) 
    {
        this.currentLevel = currentLevel;
    }
    public Integer getCompletedChallenges() 
    {
        return completedChallenges;
    }
    public void setCompletedChallenges(Integer completedChallenges) 
    {
        this.completedChallenges = completedChallenges;
    }
    public Integer getAverageScore()
    {
        return averageScore;
    }
    public void setAverageScore(Integer averageScore) 
    {
        this.averageScore = averageScore;
    }
    public Integer getStreak() 
    {
        return streak;
    }
    public void setStreak(Integer streak) 
    {
        this.streak = streak;
    }
    public List<Map<String, Object>> getScoreOverTime()
    {
        return scoreOverTime;
    }
    public void setScoreOverTime(List<Map<String, Object>> scoreOverTime) 
    {
        this.scoreOverTime = scoreOverTime;
    }
    public List<Map<String, Object>> getSkillByLanguage()
    {
        return skillByLanguage;
    }
    public void setSkillByLanguage(List<Map<String, Object>> skillByLanguage)
    {
        this.skillByLanguage = skillByLanguage;
    }
}
