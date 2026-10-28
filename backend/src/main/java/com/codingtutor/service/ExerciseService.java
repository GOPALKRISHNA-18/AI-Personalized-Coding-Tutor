package com.codingtutor.service;

import com.codingtutor.entity.Exercise;
import com.codingtutor.entity.LearnerProfile;
import com.codingtutor.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepo;

    @Autowired
    private LearnerProfileService profileService;

    public List<Exercise> getAllExercises(String language, String difficulty, String topic, String search) {
        List<Exercise> list = exerciseRepo.findAll();
        if (language != null && !language.isEmpty() && !language.equalsIgnoreCase("All")) {
            list = list.stream().filter(e -> e.getLanguage().equalsIgnoreCase(language)).collect(Collectors.toList());
        }
        if (difficulty != null && !difficulty.isEmpty() && !difficulty.equalsIgnoreCase("All")) {
            list = list.stream().filter(e -> e.getDifficulty().equalsIgnoreCase(difficulty)).collect(Collectors.toList());
        }
        if (topic != null && !topic.isEmpty() && !topic.equalsIgnoreCase("All")) {
            list = list.stream().filter(e -> e.getTopic().equalsIgnoreCase(topic)).collect(Collectors.toList());
        }
        if (search != null && !search.isEmpty()) {
            String term = search.toLowerCase();
            list = list.stream().filter(e -> e.getTitle().toLowerCase().contains(term) || e.getDescription().toLowerCase().contains(term)).collect(Collectors.toList());
        }
        return list;
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Exercise not found with id: " + id));
    }

    public Exercise addExercise(Exercise exercise) {
        return exerciseRepo.save(exercise);
    }

    public Exercise updateExercise(Long id, Exercise exercise) {
        Exercise existing = getExerciseById(id);
        existing.setTitle(exercise.getTitle());
        existing.setDescription(exercise.getDescription());
        existing.setLanguage(exercise.getLanguage());
        existing.setDifficulty(exercise.getDifficulty());
        existing.setStarterCode(exercise.getStarterCode());
        existing.setTopic(exercise.getTopic());
        return exerciseRepo.save(existing);
    }

    public void deleteExercise(Long id) {
        exerciseRepo.deleteById(id);
    }

    public List<Exercise> getRecommendedExercises(Long userId) {
        LearnerProfile profile = profileService.getProfileByUserId(userId);
        String level = profile != null && profile.getSkillLevel() != null ? profile.getSkillLevel() : "Beginner";
        String lang = profile != null ? profile.getPreferredLanguage() : null;
        List<Exercise> list = exerciseRepo.findByDifficulty(level);
        if (lang != null && !lang.isEmpty()) {
            List<Exercise> langFiltered = list.stream().filter(e -> e.getLanguage().equalsIgnoreCase(lang)).collect(Collectors.toList());
            if (!langFiltered.isEmpty()) {
                return langFiltered;
            }
        }
        return list.isEmpty() ? exerciseRepo.findAll() : list;
    }
}
