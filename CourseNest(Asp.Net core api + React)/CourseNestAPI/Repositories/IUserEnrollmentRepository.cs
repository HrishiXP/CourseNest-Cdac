using CourseNest.Models;
using CourseNest.Models.DTOs;

namespace CourseNest.Repositories;

public interface IUserEnrollmentRepository
{
    Task<IEnumerable<Enrollment>> UserEnrollments(bool getAll=false);
    Task ChangeEnrollmentStatus(UpdateEnrollmentStatusModel data);

    Task<Enrollment?> GetEnrollmentById(int id);
    Task<IEnumerable<EnrollmentStatus>> GetEnrollmentStatuses();

}