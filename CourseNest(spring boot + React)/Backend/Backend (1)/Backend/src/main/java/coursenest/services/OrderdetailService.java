package coursenest.services;

import java.util.List;

import coursenest.entities.Order;
import coursenest.entities.OrderDetails;



public interface OrderdetailService {

	void saveOrderDetails(OrderDetails od);
	
	OrderDetails findById(int id);
	
	List<OrderDetails> findByOrder(Order order);
	
}
