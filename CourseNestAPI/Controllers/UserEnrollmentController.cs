using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    [Authorize(Policy = "AllowAnonymous")]
    public class UserEnrollmentController : ControllerBase
    {
        private readonly IUserEnrollmentRepository _userEnrollmentRepo;

        public UserEnrollmentController(IUserEnrollmentRepository userEnrollmentRepo)
        {
            _userEnrollmentRepo = userEnrollmentRepo;
        }

        // Get all enrollments for the current user
        [HttpGet("enrollments")]
        public async Task<IActionResult> GetUserEnrollments()
        {
            var enrollments = await _userEnrollmentRepo.UserEnrollments();
            if (enrollments == null || !enrollments.Any())
            {
                return NotFound("No enrollments found for the current user.");
            }
            return Ok(enrollments);
        }
    }
}
