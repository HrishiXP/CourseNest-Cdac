package coursenest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import coursenest.daos.CourseDao;
import coursenest.entities.Course;
import coursenest.utils.StorageService;


@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	private CourseDao courseDao;
	
	@Autowired
	private StorageService storageService;
	
	@Autowired
	private InstructorService instructorService;

	@Override
	public void addCourse(Course c, MultipartFile pic) {
		// TODO Auto-generated method stub
		String photo = storageService.store(pic);
		c.setPhoto(photo);
		courseDao.save(c);
	}

	@Override
	public List<Course> findCourses(int instructorId) {
		// TODO Auto-generated method stub
		return courseDao.findByInstructor(instructorService.findById(instructorId), Sort.by(Sort.Direction.DESC, "courseid"));
	}

	@Override
	public void updateCourse(Course c) {
		Course cc = courseDao.getById(c.getCourseid());
		c.setInstructor(cc.getInstructor());
		courseDao.save(c);
	}

	@Override
	public void deleteCourse(int courseid) {
		// TODO Auto-generated method stub
		Course c = courseDao.getById(courseid);
		courseDao.delete(c);
	}

	@Override
	public List<Course> allCourses() {
		// TODO Auto-generated method stub
		return courseDao.findAll(Sort.by(Sort.Direction.DESC, "courseid"));
	}

	@Override
	public Course findCourseById(int courseid) {
		// TODO Auto-generated method stub
		return courseDao.getById(courseid);
	}

	@Override
	public List<Course> categoryCourses(String coursecat, String subcat) {
		// TODO Auto-generated method stub
		return courseDao.findByCoursecatAndSubcat(coursecat, subcat, Sort.by(Sort.Direction.DESC, "courseid"));
	}

	@Override
	public Page<Course> allCoursesPaginated(int page, int pagesize) {
		Page<Course> courses = courseDao.findAll(PageRequest.of(page, pagesize, Sort.by(Direction.DESC, "courseid")));
		System.err.println(courses.getSize());
		return courses;
	}
}
