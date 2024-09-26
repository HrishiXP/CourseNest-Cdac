package com.example.CourseNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CourseNest.model.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {

}
