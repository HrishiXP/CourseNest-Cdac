package com.example.CourseNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CourseNest.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
