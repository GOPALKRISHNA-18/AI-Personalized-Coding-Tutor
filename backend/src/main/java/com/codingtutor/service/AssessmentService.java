package com.codingtutor.service;

import com.codingtutor.entity.Assessment;
import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepo;

    @Autowired
    private LearnerProfileService profileService;

    public Assessment submitAssessment(Long userId, String language, Integer score) {
        String level;
        if (score < 40) {
            level = "Beginner";
        } else if (score <= 74) {
            level = "Intermediate";
        } else {
            level = "Advanced";
        }
        Assessment assessment = new Assessment(userId, language, score, level);
        Assessment saved = assessmentRepo.save(assessment);

        LearnerProfile profile = profileService.getProfileByUserId(userId);
        profile.setSkillLevel(level);
        profile.setPreferredLanguage(language);
        profileService.updateProfile(profile);

        return saved;
    }

    public List<Assessment> getAssessmentsByUser(Long userId) {
        return assessmentRepo.findByUserIdOrderByTakenAtDesc(userId);
    }
}
