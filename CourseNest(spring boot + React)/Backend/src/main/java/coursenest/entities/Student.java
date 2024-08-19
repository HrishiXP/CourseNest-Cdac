package coursenest.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "students_table")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ApiModelProperty(notes = "Database generated student Id")
	@Column(name = "student_id")
	@JsonProperty("id")
	private int id;
	
	@ApiModelProperty(notes = "Name of the student")
	@Column(name = "student_name")
	@JsonProperty("name")
	private String name;
	
	private String city;
	
	@Column(name = "student_emailID")
	@JsonProperty("userid")
	private String userid;
	
	@Column(name = "student_password")
	@JsonProperty("pwd")
	private String pwd;
	
	@Column(name = "student_phoneNo")
	@JsonProperty("phone")
	private String phone;
	
	private String gender;
	
	@Column(name = "created_timestamp", updatable = false)
	private LocalDate createdTimestamp = LocalDate.now();

}
