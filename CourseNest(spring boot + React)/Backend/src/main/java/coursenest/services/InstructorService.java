package coursenest.services;

import java.util.List;

import coursenest.entities.Instructor;




public interface InstructorService {
	
	Instructor registerInstructor(Instructor instructor);
	
	List<Instructor> allInstructors();
	
	Instructor findById(int id);
	
	Instructor validate(String userid,String pwd);
	
	void deleteInstructor(int id);

	Instructor updateInstructorProfile(int id, Instructor updatedInstructor);
	
	
}
