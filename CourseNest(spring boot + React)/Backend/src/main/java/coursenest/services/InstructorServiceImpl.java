package coursenest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coursenest.daos.InstructorDao;
import coursenest.entities.Instructor;




@Service
public class InstructorServiceImpl implements InstructorService {

	@Autowired private InstructorDao dao;
	@Override
	public Instructor registerInstructor(Instructor instructor) {
		// TODO Auto-generated method stub
		Instructor registerInstructor = dao.findByUserid(instructor.getUserid());
		if(registerInstructor == null) {
			return dao.save(instructor);
		}
		return null;
	}

	@Override
	public List<Instructor> allInstructors() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Instructor findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public Instructor validate(String userid, String pwd) {
		Instructor instructor=dao.findByUserid(userid);
		if(instructor!=null && instructor.getPwd().equals(pwd)) {
			return instructor;
		}
		return null;
	}

	@Override
	public void deleteInstructor(int id) {
		// TODO Auto-generated method stub
		Instructor instructor=dao.getById(id);
		dao.delete(instructor);
	}
	
	@Override
	public Instructor updateInstructorProfile(int id, Instructor updatedInstructor) {
		Instructor existingInstructor = dao.getById(id);

	    if (existingInstructor != null) {
	        // You may want to add validation or business logic here before updating
	    	existingInstructor.setName(updatedInstructor.getName());
	    	//existingInstructor.setCity(updatedInstructor.getCity());
	    	existingInstructor.setUserid(updatedInstructor.getUserid());
	    	existingInstructor.setPwd(updatedInstructor.getPwd());
	    	existingInstructor.setPhone(updatedInstructor.getPhone());
	        // Add other fields as needed

	        return dao.save(existingInstructor);
	    }

	    return null;
	}
}
