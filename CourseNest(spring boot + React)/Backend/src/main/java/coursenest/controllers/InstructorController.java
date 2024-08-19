package coursenest.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import coursenest.entities.Instructor;

import coursenest.models.LoginDTO;
import coursenest.models.Response;
import coursenest.services.InstructorService;

@CrossOrigin
@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

	@Autowired
	private InstructorService instructorService;

	@PostMapping
	public ResponseEntity<?> save(@RequestBody Instructor instructor) {
		Instructor newInstructor = instructorService.registerInstructor(instructor);
		if (newInstructor != null) {
			return Response.success(instructor);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

	}

	@GetMapping
	public ResponseEntity<?> findAllInstructors() {
		List<Instructor> result = instructorService.allInstructors();
		return Response.success(result);
	}

	@GetMapping("{id}")
	public ResponseEntity<?> findInstructorProfile(@PathVariable("id") int id) {
		Instructor result = instructorService.findById(id);
		return Response.success(result);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteInstructor(@PathVariable("id") int id) {
		instructorService.deleteInstructor(id);
		return Response.status(HttpStatus.OK);
	}

	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Instructor user = instructorService.validate(dto.getUserid(), dto.getPwd());
		if (user != null)
			return Response.success(user);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}

}
