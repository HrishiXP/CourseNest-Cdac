package coursenest.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "admins_table")
public class Admin {

	@Id
	@Column(name = "admin_id")
	@JsonProperty("userid")
	private String userid;
	
	@JsonProperty("pwd")
	@Column(name = "admin_password")
	private String pwd;
	
	@JsonProperty("uname")
	@Column(name = "admin_name")
	private String uname;
	
}
