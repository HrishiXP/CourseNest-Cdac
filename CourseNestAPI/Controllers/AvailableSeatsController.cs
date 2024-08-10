using CourseNest.Constants;
using CourseNest.Models.DTOs;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(Roles.Admin))]
    public class AvailableSeatsController : ControllerBase
    {

        private readonly ISeatsRepository _seatsRepo;

        public AvailableSeatsController(ISeatsRepository seatsRepo)
        {
            _seatsRepo = seatsRepo;
        }

        public async Task<IActionResult> Index(string sTerm = "")
        {
            var seatss = await _seatsRepo.GetSeatss(sTerm);
            if (seatss == null)
            {
                return NotFound();
            }
            return Ok(seatss);

        }

        public async Task<IActionResult> ManangeSeats(int courseId)
        {
            var existingSeats = await _seatsRepo.GetAvailableSteatsByCourseId(courseId);
            var seats = new SeatsDTO
            {
                CourseId = courseId,
                SeatCount = existingSeats != null
            ? existingSeats.SeatCount : 0
            };
            if (seats == null)
            {
                return NotFound();
            }
            return Ok(seats);

        }

        [HttpPost]
        public async Task<IActionResult> ManangeSeats(SeatsDTO seats)
        {
            if (!ModelState.IsValid)
                if (seats == null)
                {
                    return NotFound();
                }
            return Ok(seats);

            try
            {
                await _seatsRepo.ManageSeats(seats);
                return Ok(new { message = "AvailableSeats is updated successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Something went wrong!!" });
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
