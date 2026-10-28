package com.codingtutor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private Integer score;

    @Column(name = "level_result", nullable = false)
    private String levelResult;

    @Column(name = "taken_at")
    private LocalDateTime takenAt;

    public Assessment() {
        this.takenAt = LocalDateTime.now();
    }

    public Assessment(Long userId, String language, Integer score, String levelResult) {
        this.userId = userId;
        this.language = language;
        this.score = score;
        this.levelResult = levelResult;
        this.takenAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getLevelResult() {
        return levelResult;
    }

    public void setLevelResult(String levelResult) {
        this.levelResult = levelResult;
    }

    public LocalDateTime getTakenAt() {
        return takenAt;
    }

    public void setTakenAt(LocalDateTime takenAt) {
        this.takenAt = takenAt;
    }
}
