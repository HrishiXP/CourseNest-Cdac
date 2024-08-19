package coursenest.models;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoursePagedResponseDTO {
	
	private List<CourseResponseDTO> clist;
	
	private int current;
	
	private long total;
	
	private int pagesize;

}
