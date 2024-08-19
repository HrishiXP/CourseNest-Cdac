package coursenest.services;

import coursenest.entities.Admin;

public interface AdminService {
	
	Admin validate(String userid,String pwd);
	
	void updateAdmin(Admin amin);

	long countAdmin();
}
