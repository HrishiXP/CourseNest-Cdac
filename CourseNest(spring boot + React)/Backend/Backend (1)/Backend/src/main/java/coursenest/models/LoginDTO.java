package coursenest.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
public class LoginDTO {
	
	private String userid;
	
	private String pwd;
	
	private String role;
	
}
