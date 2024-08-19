package coursenest.models;

import org.springframework.beans.BeanUtils;

import coursenest.entities.Course;
import coursenest.entities.OrderDetails;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
public class OrderDetailsDTO {

	private int id;

	private Course course;

	private int qty;

	public static OrderDetailsDTO fromEntity(OrderDetails entity) {
		OrderDetailsDTO dto = new OrderDetailsDTO();
		BeanUtils.copyProperties(entity, dto);
		return dto;
	}
}
