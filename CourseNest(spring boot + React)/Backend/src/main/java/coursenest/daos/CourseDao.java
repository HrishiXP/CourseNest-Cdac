package coursenest.daos;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import coursenest.entities.Course;
import coursenest.entities.Instructor;




@Repository
public interface CourseDao extends JpaRepository<Course, Integer> {

	List<Course> findByInstructor(Instructor instructorId, Sort sort);

	List<Course> findByCoursecatAndSubcat(String coursecat, String subcat, Sort sort);
}
	