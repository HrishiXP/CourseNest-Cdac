package coursenest.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import coursenest.entities.Instructor;




@Repository
public interface InstructorDao extends JpaRepository<Instructor, Integer> {
	
	Instructor findByUserid(String userid);

}
