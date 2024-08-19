package coursenest.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "instructor_table")
public class Instructor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "instructor_id")
	@JsonProperty("id")
	private int id;
	
	@Column(name = "instructor_name")
	@JsonProperty("name")
	private String name;
	
	private String qualification;
	
	@Column(name = "instructor_emailID")
	@JsonProperty("userid")
	private String userid;
	
	@Column(name = "instructor_password")
	@JsonProperty("pwd")
	private String pwd;
	
	@Column(name = "instructor_phoneNo")
	@JsonProperty("phone")
	private String phone;
	
	@Column(name = "created_timestamp", updatable = false)
	private LocalDate createdTimestamp = LocalDate.now();

}
