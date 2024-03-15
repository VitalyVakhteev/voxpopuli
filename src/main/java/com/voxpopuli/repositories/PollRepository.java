package com.voxpopuli.repositories;

import com.voxpopuli.voxpopuli.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
    List<Poll> findAllByEndTimeBefore(LocalDateTime endTime);
}