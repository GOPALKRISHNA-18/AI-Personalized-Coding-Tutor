package com.codingtutor.repository;
import com.codingtutor.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> 
{
    List<Quiz> findByLanguage(String language);
    List<Quiz> findByDifficulty(String difficulty);
}
