package coursenest.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import coursenest.entities.Order;
import coursenest.entities.OrderDetails;



@Repository
public interface OrderDetailsDao extends JpaRepository<OrderDetails, Integer> {
	
	List<OrderDetails> findByOrder(Order order);
	
}
