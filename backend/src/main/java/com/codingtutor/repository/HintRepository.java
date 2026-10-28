package com.codingtutor.repository;
import com.codingtutor.entity.Hint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface HintRepository extends JpaRepository<Hint, Long> 
{
    List<Hint> findByExerciseIdOrderByHintLevelAsc(Long exerciseId);
    Optional<Hint> findByExerciseIdAndHintLevel(Long exerciseId, Integer hintLevel);
}
