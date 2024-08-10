using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserEnrollmentController : ControllerBase
    {

        private readonly IUserEnrollmentRepository _userEnrollmentRepo;

        public UserEnrollmentController(IUserEnrollmentRepository userEnrollmentRepo)
        {
            _userEnrollmentRepo = userEnrollmentRepo;
        }
        public async Task<IActionResult> UserEnrollments()
        {
            var enrollments = await _userEnrollmentRepo.UserEnrollments();
            if (enrollments == null)
            {
                return NotFound();
            }
            return Ok(enrollments);
        }
    }
}
