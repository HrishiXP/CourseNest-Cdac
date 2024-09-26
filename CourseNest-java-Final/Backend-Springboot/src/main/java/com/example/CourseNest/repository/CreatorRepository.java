package com.example.CourseNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CourseNest.model.Creator;

public interface CreatorRepository extends JpaRepository<Creator, Long> {
	Creator findByEmail(String email);
}
