using CourseNest.Constants;
using CourseNest.Models.DTOs;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
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

        // Get all available seats optionally filtered by search term
        [HttpGet]
        public async Task<IActionResult> GetAvailableSeats(string sTerm = "")
        {
            var seats = await _seatsRepo.GetSeatss(sTerm);
            if (seats == null || !seats.Any())
            {
                return NotFound("No seats found.");
            }
            return Ok(seats);
        }

        // Get seat management data for a specific course
        [HttpGet("{courseId}")]
        public async Task<IActionResult> ManageSeats(int courseId)
        {
            var existingSeats = await _seatsRepo.GetAvailableSteatsByCourseId(courseId);    
            var seatsDto = new SeatsDTO
            {
                CourseId = courseId,
                SeatCount = existingSeats?.SeatCount ?? 0
            };

            return Ok(seatsDto);
        }

        // Update seats for a specific course
        [HttpPost]
        public async Task<IActionResult> ManageSeats(SeatsDTO seatsDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _seatsRepo.ManageSeats(seatsDto);
                return Ok(new { message = "Seats updated successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception (ex) if necessary
                return StatusCode(500, "An error occurred while updating the seats.");
            }
        }
    }
}
