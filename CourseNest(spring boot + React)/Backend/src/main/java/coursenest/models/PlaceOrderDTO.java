package coursenest.models;

import java.util.List;

import coursenest.entities.Payment;
import coursenest.entities.StudentsInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderDTO {

	private StudentsInfo studentsInfo;
	
	private List<CartDTO> cart;
	
	private Payment payment;
	
	private int studentid;
			
}
