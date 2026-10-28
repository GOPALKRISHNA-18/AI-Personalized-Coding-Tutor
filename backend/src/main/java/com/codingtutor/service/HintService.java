package com.codingtutor.service;

import com.codingtutor.entity.Hint;
import com.codingtutor.repository.HintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HintService {

    @Autowired
    private HintRepository hintRepo;

    public List<Hint> getHintsByExerciseId(Long exerciseId) {
        return hintRepo.findByExerciseIdOrderByHintLevelAsc(exerciseId);
    }

    public Hint getHintByExerciseIdAndLevel(Long exerciseId, Integer level) {
        return hintRepo.findByExerciseIdAndHintLevel(exerciseId, level).orElse(null);
    }
}
