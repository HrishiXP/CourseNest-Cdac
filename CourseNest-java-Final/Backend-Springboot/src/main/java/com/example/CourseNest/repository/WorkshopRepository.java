package com.example.CourseNest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CourseNest.model.Workshop;

public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
	List<Workshop> findByCreatorCreatorId(Long creatorId);
}
