package com.codingtutor.repository;
import com.codingtutor.entity.LearnerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface LearnerProfileRepository extends JpaRepository<LearnerProfile, Long>
{
    Optional<LearnerProfile> findByUserId(Long userId);
}
