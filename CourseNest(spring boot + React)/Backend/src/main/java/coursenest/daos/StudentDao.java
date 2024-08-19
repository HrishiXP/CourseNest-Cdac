package coursenest.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import coursenest.entities.Student;





@Repository
public interface StudentDao extends JpaRepository<Student, Integer> {
	
	Student findByUserid(String userId);
	
}
