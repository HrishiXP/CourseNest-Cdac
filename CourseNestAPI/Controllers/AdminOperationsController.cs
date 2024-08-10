using CourseNest.Models.DTOs;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminOperationsController : ControllerBase
    {
        private readonly IUserEnrollmentRepository _userEnrollmentRepository;

        public AdminOperationsController(IUserEnrollmentRepository userEnrollmentRepository)
        {
            _userEnrollmentRepository = userEnrollmentRepository;
        }

        // Get all user enrollments
        [HttpGet("enrollments")]
        public async Task<IActionResult> GetAllEnrollments()
        {
            var enrollments = await _userEnrollmentRepository.UserEnrollments(true);
            if (enrollments == null)
            {
                return NotFound("No enrollments found.");
            }
            return Ok(enrollments);
        }

        // Get details to update enrollment status
        [HttpGet("enrollments/{enrollmentId}")]
        public async Task<IActionResult> GetEnrollmentStatusUpdate(int enrollmentId)
        {
            var enrollment = await _userEnrollmentRepository.GetEnrollmentById(enrollmentId);
            if (enrollment == null)
            {
                return NotFound($"Enrollment with id: {enrollmentId} was not found.");
            }

            var enrollmentStatusList = (await _userEnrollmentRepository.GetEnrollmentStatuses()).Select(enrollmentStatus =>
                new SelectListItem
                {
                    Value = enrollmentStatus.Id.ToString(),
                    Text = enrollmentStatus.EnrollmentStatusName,
                    Selected = enrollment.EnrollmentStatusId == enrollmentStatus.Id
                });

            var data = new UpdateEnrollmentStatusModel
            {
                EnrollmentId = enrollmentId,
                EnrollmentStatusId = enrollment.EnrollmentStatusId,
                EnrollmentStatusList = enrollmentStatusList
            };

            return Ok(data);
        }

        // Update enrollment status
        [HttpPut("enrollments/{enrollmentId}")]
        public async Task<IActionResult> UpdateEnrollmentStatus(UpdateEnrollmentStatusModel data)
        {
            if (!ModelState.IsValid)
            {
                data.EnrollmentStatusList = (await _userEnrollmentRepository.GetEnrollmentStatuses()).Select(enrollmentStatus =>
                    new SelectListItem
                    {
                        Value = enrollmentStatus.Id.ToString(),
                        Text = enrollmentStatus.EnrollmentStatusName,
                        Selected = enrollmentStatus.Id == data.EnrollmentStatusId
                    });

                return BadRequest("Invalid model state.");
            }

            try
            {
                await _userEnrollmentRepository.ChangeEnrollmentStatus(data);
                return Ok(new { message = "Enrollment status updated successfully." });
            }
            catch (Exception ex)
            {
                // Log exception (ex) if needed
                return StatusCode(500, "An error occurred while updating enrollment status.");
            }
        }

        // Admin dashboard placeholder
        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            return Ok("Admin dashboard placeholder.");
        }
    }
}
