package com.codingtutor.service;

import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.entity.User;
import com.codingtutor.repository.LearnerProfileRepository;
import com.codingtutor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LearnerProfileService {

    @Autowired
    private LearnerProfileRepository profileRepo;

    @Autowired
    private UserRepository userRepo;

    public LearnerProfile getProfileByUserId(Long userId) {
        return profileRepo.findByUserId(userId).orElse(null);
    }

    public LearnerProfile updateProfile(LearnerProfile profileData) {
        LearnerProfile existing = profileRepo.findByUserId(profileData.getUserId())
                .orElseGet(() -> new LearnerProfile(profileData.getUserId(), "", "Beginner", "", ""));
        if (profileData.getPreferredLanguage() != null) {
            existing.setPreferredLanguage(profileData.getPreferredLanguage());
        }
        if (profileData.getSkillLevel() != null) {
            existing.setSkillLevel(profileData.getSkillLevel());
        }
        if (profileData.getGoal() != null) {
            existing.setGoal(profileData.getGoal());
        }
        return profileRepo.save(existing);
    }

    public User updateUserName(Long userId, String name) {
        if (userId == null) return null;
        User user = userRepo.findById(userId).orElse(null);
        if (user != null && name != null && !name.trim().isEmpty()) {
            user.setName(name.trim());
            return userRepo.save(user);
        }
        return user;
    }
}
