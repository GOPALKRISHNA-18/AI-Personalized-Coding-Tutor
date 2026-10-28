package com.codingtutor.service;

import com.codingtutor.dto.DashboardResponse;
import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.entity.Progress;
import com.codingtutor.repository.LearnerProfileRepository;
import com.codingtutor.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepo;

    @Autowired
    private LearnerProfileRepository profileRepo;

    public void recordProgress(Long userId, String language, int score) {
        Progress progress = progressRepo.findByUserIdAndLanguage(userId, language)
                .orElseGet(() -> new Progress(userId, language, 0, 0));
        progress.setCompletedCount(progress.getCompletedCount() + 1);
        progress.setTotalScore(progress.getTotalScore() + score);
        progressRepo.save(progress);
    }

    public List<Progress> getProgressByUser(Long userId) {
        return progressRepo.findByUserId(userId);
    }

    public DashboardResponse getDashboard(Long userId) {
        LearnerProfile profile = profileRepo.findByUserId(userId).orElse(null);
        List<Progress> progressList = getProgressByUser(userId);

        int totalChallenges = 0;
        int totalScore = 0;
        List<Map<String, Object>> skillByLanguage = new ArrayList<>();

        for (Progress p : progressList) {
            totalChallenges += p.getCompletedCount();
            totalScore += p.getTotalScore();
            Map<String, Object> item = new HashMap<>();
            item.put("language", p.getLanguage());
            int avg = p.getCompletedCount() > 0 ? (int) Math.round((double) p.getTotalScore() / p.getCompletedCount()) : 0;
            item.put("score", avg);
            item.put("challenges", p.getCompletedCount());
            skillByLanguage.add(item);
        }

        int averageScore = totalChallenges > 0 ? (int) Math.round((double) totalScore / totalChallenges) : 0;
        List<Map<String, Object>> scoreOverTime = new ArrayList<>();
        String level = profile != null && profile.getSkillLevel() != null ? profile.getSkillLevel() : "Beginner";

        return new DashboardResponse(level, totalChallenges, averageScore, 0, scoreOverTime, skillByLanguage);
    }
}
