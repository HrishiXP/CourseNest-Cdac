package coursenest.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import coursenest.entities.Course;




public interface CourseService {

	void addCourse(Course c, MultipartFile pic);

	List<Course> findCourses(int instructorId);

	void updateCourse(Course c);

	void deleteCourse(int courseid);

	List<Course> allCourses();

	List<Course> categoryCourses(String coursecat, String subcat);

	Course findCourseById(int courseid);

	Page<Course> allCoursesPaginated(int page, int pageSize);
}
