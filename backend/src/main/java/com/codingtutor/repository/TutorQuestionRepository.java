package com.codingtutor.repository;
import com.codingtutor.entity.TutorQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface TutorQuestionRepository extends JpaRepository<TutorQuestion, Long> 
{
    List<TutorQuestion> findAllByOrderByIdAsc();
}
