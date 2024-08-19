package coursenest.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import coursenest.entities.Course;

import coursenest.entities.Order;
import coursenest.entities.OrderDetails;
import coursenest.entities.Payment;

import coursenest.entities.Student;
import coursenest.entities.StudentsInfo;
import coursenest.models.CartDTO;
import coursenest.models.OrderDetailsDTO;
import coursenest.models.OrderResponseDTO;
import coursenest.models.PlaceOrderDTO;
import coursenest.models.Response;
import coursenest.services.CourseService;

import coursenest.services.OrderService;
import coursenest.services.OrderdetailService;
import coursenest.services.PaymentService;

import coursenest.services.StudentService;
import coursenest.services.StudentsInfoService;

@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private StudentsInfoService studentsInfoService;
	
	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private OrderdetailService orderDetailsService;
	
	@Autowired
	private CourseService courseService;

	@PostMapping
	public ResponseEntity<?> save(@RequestBody PlaceOrderDTO dto) {
		StudentsInfo studentsInfo = studentsInfoService.saveStudentsInfo(dto.getStudentsInfo());
		dto.getPayment().setPaymentdate(new Date());
		Payment payment = paymentService.savePayment(dto.getPayment());
		Order order = new Order();
		order.setOrderDate(LocalDate.now());
		order.setStudentsInfo(studentsInfo);
		order.setPayment(payment);
		Student student = studentService.findById(dto.getStudentid());
		order.setStudent(student);
		Order orders = orderService.saveOrder(order);
		Course course = null;
		@SuppressWarnings("unused")
		int qty = 0;

		for (CartDTO cart : dto.getCart()) {
			OrderDetails od = new OrderDetails();
			od.setOrder(orders);
			od.setQty(cart.getQty());
			course = courseService.findCourseById(cart.getCourseid());
			qty = cart.getQty();
			od.setCourse(course);
			orderDetailsService.saveOrderDetails(od);
		}

		System.out.println(dto.getStudentsInfo());
		System.out.println(dto.getStudentid());
		System.out.println(dto.getPayment());
		System.out.println(dto.getCart().get(0));

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@GetMapping
	public ResponseEntity<?> findAllOrders(Optional<Integer> studentid) {
		List<Order> result = null;
		if (studentid.isPresent()) {
			Student student = studentService.findById(studentid.get());
			result = orderService.getStudentOrders(student);
		} else {
			result = orderService.getAllOrders();
		}
		return Response.success(result);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findOrderById(@PathVariable("id") int id) {
		Order order = orderService.findById(id);
		List<OrderDetails> details = orderDetailsService.findByOrder(order);
		List<OrderDetailsDTO> detailsdto = new ArrayList<OrderDetailsDTO>();
		details.forEach(od -> {
			OrderDetailsDTO dto = OrderDetailsDTO.fromEntity(od);
			detailsdto.add(dto);
		});
		OrderResponseDTO result = new OrderResponseDTO();
		result.setOrder(order);
		result.setDetails(detailsdto);
		return Response.success(result);
	}
}