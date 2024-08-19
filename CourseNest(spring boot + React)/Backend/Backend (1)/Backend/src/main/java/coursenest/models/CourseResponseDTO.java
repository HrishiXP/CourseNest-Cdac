package coursenest.models;

import org.springframework.beans.BeanUtils;

import coursenest.entities.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponseDTO {
	
	
	
	private int courseid;
	
	private String coursename;
	
	private String coursecat;
	
	private String subcat;
	
	private int price;
	
	private int instructorId;
	
	private String instructorName;
	
	private String photo;
	
	public static CourseResponseDTO fromEntity(Course entity) {
		CourseResponseDTO dto = new CourseResponseDTO();
		dto.setInstructorId(entity.getInstructor().getId());
		dto.setInstructorName(entity.getInstructor().getName());
		BeanUtils.copyProperties(entity, dto);
		
		return dto;
	}
}
