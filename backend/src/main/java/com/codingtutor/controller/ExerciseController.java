package com.codingtutor.controller;
import com.codingtutor.entity.Exercise;
import com.codingtutor.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController
{
    @Autowired
    private ExerciseService exerciseService;
    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises(
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String search) 
    {
        List<Exercise> list = exerciseService.getAllExercises(language, difficulty, topic, search);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) 
    {
        Exercise exercise = exerciseService.getExerciseById(id);
        return ResponseEntity.ok(exercise);
    }
    @PostMapping
    public ResponseEntity<Exercise> addExercise(@RequestBody Exercise exercise) 
    {
        Exercise saved = exerciseService.addExercise(exercise);
        return ResponseEntity.ok(saved);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise exercise)
    {
        Exercise updated = exerciseService.updateExercise(id, exercise);
        return ResponseEntity.ok(updated);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) 
    {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/recommended/{userId}")
    public ResponseEntity<List<Exercise>> getRecommendedExercises(@PathVariable Long userId) 
    {
        List<Exercise> list = exerciseService.getRecommendedExercises(userId);
        return ResponseEntity.ok(list);
    }
}
