using CourseNest.Models.DTOs;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Http;
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

        public async Task<IActionResult> AllEnrollments()
        {
            var enrollments = await _userEnrollmentRepository.UserEnrollments(true);
            if (enrollments == null)
            {
                return NotFound();
            }
            return Ok(enrollments);

        }



        public async Task<IActionResult> UpdateEnrollmentStatus(int enrollmentId)
        {
            var enrollment = await _userEnrollmentRepository.GetEnrollmentById(enrollmentId);
            if (enrollment == null)
            {
                throw new InvalidOperationException($"Enrollmentwith id:{enrollmentId} does not found.");
            }
            var enrollmentStatusList = (await _userEnrollmentRepository.GetEnrollmentStatuses()).Select(enrollmentStatus =>
            {
                return new SelectListItem { Value = enrollmentStatus.Id.ToString(), Text = enrollmentStatus.EnrollmentStatusName, Selected = enrollment.EnrollmentStatusId == enrollmentStatus.Id };
            });
            var data = new UpdateEnrollmentStatusModel
            {
                EnrollmentId = enrollmentId,
                EnrollmentStatusId = enrollment.EnrollmentStatusId,
                EnrollmentStatusList = enrollmentStatusList
            };
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);

        }

        [HttpPost]
        public async Task<IActionResult> UpdateEnrollmentStatus(UpdateEnrollmentStatusModel data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    data.EnrollmentStatusList = (await _userEnrollmentRepository.GetEnrollmentStatuses()).Select(enrollmentStatus =>
                    {
                        return new SelectListItem { Value = enrollmentStatus.Id.ToString(), Text = enrollmentStatus.EnrollmentStatusName, Selected = enrollmentStatus.Id == data.EnrollmentStatusId };
                    });

                    if (data == null)
                    {
                        return NotFound();
                    }
                    return Ok(data);
                }
                await _userEnrollmentRepository.ChangeEnrollmentStatus(data);
                return Ok(new { message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                // catch exception here
                return Ok(new { message = "Something went wrong" });
            }
            return RedirectToAction(nameof(UpdateEnrollmentStatus), new { enrollmentId = data.EnrollmentId });
        }


        public IActionResult Dashboard()
        {
            
            return Ok();

        }

    }
}
