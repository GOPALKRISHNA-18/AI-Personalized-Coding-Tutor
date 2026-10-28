package com.codingtutor.repository;
import com.codingtutor.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> 
{
    List<Exercise> findByDifficulty(String difficulty);
    List<Exercise> findByLanguage(String language);
    List<Exercise> findByLanguageAndDifficulty(String language, String difficulty);
    List<Exercise> findByTopic(String topic);
}
