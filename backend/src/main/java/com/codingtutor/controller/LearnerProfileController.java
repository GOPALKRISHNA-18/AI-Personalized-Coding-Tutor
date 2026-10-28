package com.codingtutor.controller;
import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.entity.User;
import com.codingtutor.service.LearnerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
@RestController
@RequestMapping("/api/profiles")
public class LearnerProfileController 
{
    @Autowired
    private LearnerProfileService profileService;
    @GetMapping("/{userId}")
    public ResponseEntity<LearnerProfile> getProfile(@PathVariable Long userId)
    {
        LearnerProfile profile = profileService.getProfileByUserId(userId);
        return ResponseEntity.ok(profile);
    }
    @PutMapping
    public ResponseEntity<LearnerProfile> updateProfile(@RequestBody LearnerProfile profile) 
    {
        LearnerProfile updated = profileService.updateProfile(profile);
        return ResponseEntity.ok(updated);
    }
    @PutMapping("/user/{userId}")
    public ResponseEntity<User> updateUserName(@PathVariable Long userId, @RequestBody Map<String, String> body)
    {
        String name = body.get("name");
        User updated = profileService.updateUserName(userId, name);
        return ResponseEntity.ok(updated);
    }
}
