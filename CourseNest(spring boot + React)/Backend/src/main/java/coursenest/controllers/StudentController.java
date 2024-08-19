package coursenest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import coursenest.entities.Student;
import coursenest.models.LoginDTO;
import coursenest.models.Response;

import coursenest.services.StudentService;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@PostMapping
	@ApiOperation(value = "Save a student details", response = Student.class)
	public ResponseEntity<?> save(@RequestBody Student student) {
		Student newStudent = studentService.registerStudent(student);
		if(newStudent != null) {
			return ResponseEntity.status(HttpStatus.OK).body(newStudent);
		} else {
			return ResponseEntity.status(HttpStatus.FOUND).body("Email ID already exist");
		}
		
	}

	
	
	
	@GetMapping
	@ApiOperation(value = "List all Students", response = Iterable.class)
	public ResponseEntity<?> findAllStudents() {
		List<Student> result = studentService.allStudents();
		return Response.success(result);
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Display the details of a Student")
	public ResponseEntity<?> findStudentById(@PathVariable("id") int id) {
		Student result = studentService.findById(id);
		return Response.success(result);
	}

	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Student user = studentService.validate(dto.getUserid(), dto.getPwd());
		if (user != null)
			return Response.success(user);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}

	@PutMapping("{id}")
	public ResponseEntity<?> updateProfile(@RequestBody Student student, @PathVariable("id") int id) {
		studentService.updateProfile(student);
		return Response.status(HttpStatus.OK);
	}

}
