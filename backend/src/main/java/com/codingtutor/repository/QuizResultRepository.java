package com.codingtutor.repository;
import com.codingtutor.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long>
{
    List<QuizResult> findByUserIdOrderByTakenAtDesc(Long userId);
}
