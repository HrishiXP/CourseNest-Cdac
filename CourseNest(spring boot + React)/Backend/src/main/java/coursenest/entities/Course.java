package coursenest.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AccessLevel;
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
@Entity
@Table(name="courses_table")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "course_id")
	@JsonProperty("courseid")
	private int courseid;
	
	@Column(name = "course_name")
	@JsonProperty("coursename")
	private String coursename;
	
	
	
	@Column(name = "course_category")
	@JsonProperty("coursecat")
	private String coursecat;
	
	@Column(name = "course_subcategory")
	@JsonProperty("subcat")
	private String subcat;
	
	@Column(name = "course_price")
	@JsonProperty("price")
	private int price;
	
	@Column(name = "course_photo")
	@JsonProperty("photo")
	private String photo;
	
	@Setter(AccessLevel.NONE)
	@Column(name = "created_timestamp", updatable = false)
	private LocalDate createdTimestamp = LocalDate.now();
	
	@ManyToOne
	@JoinColumn(name="instructor_id")
	private Instructor instructor;
		
}
