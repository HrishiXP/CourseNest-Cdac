package coursenest.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

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
public class CourseDTO {

	private int courseid;

	private String cousename;

	private String coursecat;

	private String subcat;

	private int price;

	private int instructorId;

	

	private MultipartFile pic;

	public static Course toEntity(CourseDTO dto) {
		Course entity = new Course();
		BeanUtils.copyProperties(dto, entity, "pic");
		return entity;
	}
}
