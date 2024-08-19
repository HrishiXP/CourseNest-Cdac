package coursenest.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import coursenest.entities.Course;
import coursenest.entities.Instructor;

import coursenest.models.CourseDTO;
import coursenest.models.CoursePagedResponseDTO;
import coursenest.models.CourseResponseDTO;

import coursenest.models.Response;
import coursenest.services.CourseService;
import coursenest.services.InstructorService;


@CrossOrigin
@RestController
@RequestMapping("/api/courses")
public class CourseController {

	@Autowired
	private coursenest.services.CourseService courseService;

	@Autowired
	private InstructorService instructorService;

	@PostMapping
	public ResponseEntity<?> saveCourse(CourseDTO dto) {
		System.out.println(dto);
		Course course = CourseDTO.toEntity(dto);
		Instructor instructor = instructorService.findById(dto.getInstructorId());
		course.setInstructor(instructor);
		courseService.addCourse(course, dto.getPic());
		return ResponseEntity.status(HttpStatus.OK).body(course);
	}


	@PutMapping("{id}")
public ResponseEntity<?> updateCourse(@PathVariable int id, @RequestBody CourseDTO dto) {
    // Fetch the existing product
    Course existingCourse = courseService.findCourseById(id);
    if (existingCourse == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
    }
    
    // Update product details
    BeanUtils.copyProperties(dto, existingCourse, "courseid", "pic");
    courseService.updateCourse(existingCourse);
    
    return ResponseEntity.status(HttpStatus.OK).body(CourseResponseDTO.fromEntity(existingCourse));
}




	@GetMapping("{id}")
	public ResponseEntity<?> findCourse(@PathVariable int id) {
		Course course = courseService.findCourseById(id);
		return Response.success(CourseResponseDTO.fromEntity(course));
	}

	@GetMapping
	public ResponseEntity<?> findAllCourses(Optional<Integer> instructorid) {
		List<CourseResponseDTO> result = new ArrayList<CourseResponseDTO>();
		if (instructorid.isPresent()) {
			System.out.println(instructorid);
			for (Course c : courseService.findCourses(instructorid.get())) {
				result.add(CourseResponseDTO.fromEntity(c));
			}

		} else {
			for (Course c : courseService.allCourses()) {
				result.add(CourseResponseDTO.fromEntity(c));
			}
		}

		return Response.success(result);
	}

	@GetMapping("/paginated")
	public ResponseEntity<?> paginatedCourses(int page, int pagesize) {
		List<CourseResponseDTO> result = new ArrayList<CourseResponseDTO>();
		Page<Course> data = courseService.allCoursesPaginated(page, pagesize);
		data.forEach(item -> {
			result.add(CourseResponseDTO.fromEntity(item));
		});
		CoursePagedResponseDTO resp = new CoursePagedResponseDTO();
		resp.setPagesize(pagesize);
		resp.setCurrent(page);
		resp.setTotal(data.getTotalElements());
		resp.setClist(result);
		return Response.success(resp);
	}

	@GetMapping("cats")
	public ResponseEntity<?> findCategoryProducts(String cat, String subcat) {
		List<CourseResponseDTO> result = new ArrayList<CourseResponseDTO>();

		for (Course c : courseService.categoryCourses(cat, subcat)) {
			result.add(CourseResponseDTO.fromEntity(c));
		}

		return Response.success(result);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable int id) {
		Course course = courseService.findCourseById(id);
    	if (course == null) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
    	}
    
    	courseService.deleteCourse(id);
    	return ResponseEntity.status(HttpStatus.OK).body("Course deleted successfully");
	}

}
