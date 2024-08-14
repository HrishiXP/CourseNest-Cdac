using CourseNest.Models.DTOs;
using CourseNest.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using CourseNest;
using Microsoft.AspNetCore.Authorization;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "AllowAnonymous")]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHomeRepository _homeRepository;

        public HomeController(ILogger<HomeController> logger, IHomeRepository homeRepository)
        {
            _homeRepository = homeRepository;
            _logger = logger;
        }

        // Get courses with optional search term and category filter
        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses(string sterm = "", int categoryId = 0)
        {
            var courses = await _homeRepository.GetCourse(sterm, categoryId);
            var categories = await _homeRepository.Categories();

            var courseModel = new CourseDisplayModel
            {
                Courses = courses,
                Categories = categories,
                STerm = sterm,
                CategoryId = categoryId
            };

            if (!courseModel.Courses.Any())
            {
                return NotFound("No courses found matching the criteria.");
            }

            return Ok(courseModel);
        }

        // Get privacy policy
        [HttpGet("privacy")]
        public IActionResult Privacy()
        {
            return Ok("Privacy policy details...");
        }

        // Get error details
        [HttpGet("error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            var errorModel = new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier };
            return Ok(errorModel);
        }
    }
}
