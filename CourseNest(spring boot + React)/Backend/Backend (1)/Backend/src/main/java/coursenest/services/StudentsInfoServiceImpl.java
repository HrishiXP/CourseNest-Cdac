package coursenest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coursenest.daos.StudentsInfoDao;
import coursenest.entities.StudentsInfo;



@Service
public class StudentsInfoServiceImpl implements StudentsInfoService {

	@Autowired StudentsInfoDao dao;
	
	@Override
	public StudentsInfo saveStudentsInfo(StudentsInfo studentsInfo) {
		// TODO Auto-generated method stub
		return dao.save(studentsInfo);
	}

	@Override
	public StudentsInfo findStudentsInfo(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

}
