package coursenest.services;

import java.util.List;

import coursenest.entities.Student;




public interface StudentService {
	Student registerStudent(Student student);

	List<Student> allStudents();

	Student findById(int id);

	Student validate(String userid, String pwd);

	boolean verifyUserId(String userid);

	void updateProfile(Student student);
}
