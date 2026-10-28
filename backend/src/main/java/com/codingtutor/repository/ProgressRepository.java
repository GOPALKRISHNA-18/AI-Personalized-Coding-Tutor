package com.codingtutor.repository;
import com.codingtutor.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> 
{
    List<Progress> findByUserId(Long userId);
    Optional<Progress> findByUserIdAndLanguage(Long userId, String language);
}
