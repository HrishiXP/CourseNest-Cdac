package coursenest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coursenest.daos.StudentDao;
import coursenest.entities.Student;




@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentDao dao;

	@Override
	public Student registerStudent(Student student) {
		Student registerStudent = dao.findByUserid(student.getUserid());
//		System.out.println(registerCustomer);
		if(registerStudent == null) {
			return dao.save(student);
		}
		return null;
	}

	@Override
	public List<Student> allStudents() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Student findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public Student validate(String userid, String pwd) {
		Student cc = dao.findByUserid(userid);
		if (cc != null && cc.getPwd().equals(pwd)) {
			return cc;
		}
		return null;
	}

	@Override
	public boolean verifyUserId(String userid) {
		// TODO Auto-generated method stub
		return dao.findByUserid(userid) != null;
	}

	@Override
	public void updateProfile(Student student) {
		// TODO Auto-generated method stub
		if (student.getPwd().equals("") || student.getPwd() == null) {
			student.setPwd(findById(student.getId()).getPwd());
		}
		dao.save(student);
	}

}
