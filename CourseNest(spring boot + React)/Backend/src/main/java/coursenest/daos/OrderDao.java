package coursenest.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import coursenest.entities.Order;
import coursenest.entities.Student;




@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {
	
	List<Order> findByStudent(Student student);

}
