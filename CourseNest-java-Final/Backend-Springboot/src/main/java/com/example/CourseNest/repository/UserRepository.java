package com.example.CourseNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.CourseNest.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
}
