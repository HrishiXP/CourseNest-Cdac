package coursenest.services;

import java.util.List;

import coursenest.entities.Order;
import coursenest.entities.Student;



public interface OrderService {

	Order saveOrder(Order order);
	List<Order> getAllOrders();
	List<Order> getStudentOrders(Student student);
	Order findById(int id);
}
