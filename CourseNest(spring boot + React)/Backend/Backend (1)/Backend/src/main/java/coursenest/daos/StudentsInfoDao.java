package coursenest.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import coursenest.entities.StudentsInfo;



@Repository
public interface StudentsInfoDao extends JpaRepository<StudentsInfo, Integer> {

}
