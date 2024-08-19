package coursenest.services;

import coursenest.entities.StudentsInfo;

public interface StudentsInfoService {
	StudentsInfo saveStudentsInfo(StudentsInfo studentsInfo);
	StudentsInfo findStudentsInfo(int id);
}
