package coursenest.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface AdminDao extends JpaRepository<coursenest.entities.Admin, String> {

}
