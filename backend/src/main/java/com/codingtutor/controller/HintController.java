package com.codingtutor.controller;
import com.codingtutor.entity.Hint;
import com.codingtutor.service.HintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/hints")
public class HintController 
{
    @Autowired
    private HintService hintService;
    @GetMapping("/exercise/{exerciseId}")
    public ResponseEntity<List<Hint>> getHintsByExerciseId(@PathVariable Long exerciseId) 
    {
        List<Hint> list = hintService.getHintsByExerciseId(exerciseId);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/{exerciseId}/{hintLevel}")
    public ResponseEntity<Hint> getHintByLevel(@PathVariable Long exerciseId, @PathVariable Integer hintLevel)
    {
        Hint hint = hintService.getHintByExerciseIdAndLevel(exerciseId, hintLevel);
        return hint != null ? ResponseEntity.ok(hint) : ResponseEntity.notFound().build();
    }
}
