package coursenest.models;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartDTO {

	private int courseid;
	
	private String coursecat;
	
	private String coursename;
	
	private int price;
	
	private int qty;	
	
}
