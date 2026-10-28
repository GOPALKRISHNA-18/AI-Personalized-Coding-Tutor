package com.codingtutor.service;

import com.codingtutor.dto.AuthResponse;
import com.codingtutor.dto.GoogleLoginRequest;
import com.codingtutor.dto.LoginRequest;
import com.codingtutor.dto.RegisterRequest;
import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.entity.User;
import com.codingtutor.repository.LearnerProfileRepository;
import com.codingtutor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private LearnerProfileRepository profileRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        String encodedPassword = passwordEncoder.encode(req.getPassword());
        User user = new User(req.getName(), req.getEmail(), encodedPassword, "student");
        User savedUser = userRepo.save(user);

        String preferredLang = req.getPreferredLanguage() != null ? req.getPreferredLanguage() : "Python";
        String goal = req.getGoal() != null ? req.getGoal() : "";
        LearnerProfile profile = new LearnerProfile(savedUser.getId(), preferredLang, "Beginner", goal, LocalDate.now().toString());
        profileRepo.save(profile);

        String token = "jwt-token-" + savedUser.getId();
        return new AuthResponse(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole(), token);
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        String token = "jwt-token-" + user.getId();
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), token);
    }

    public AuthResponse loginWithGoogle(GoogleLoginRequest req) {
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Google account email is required");
        }
        String email = req.getEmail().trim().toLowerCase();
        User user = userRepo.findByEmail(email).orElse(null);

        if (user == null) {
            String name = req.getName();
            if (name == null || name.trim().isEmpty()) {
                name = email.split("@")[0];
            }
            String dummyPassword = passwordEncoder.encode(UUID.randomUUID().toString());
            user = new User(name, email, dummyPassword, "student");
            user = userRepo.save(user);

            LearnerProfile profile = new LearnerProfile(
                    user.getId(),
                    "Python",
                    "Beginner",
                    "Learn programming",
                    LocalDate.now().toString()
            );
            profileRepo.save(profile);
        }

        String token = "jwt-token-" + user.getId();
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), token);
    }
}
