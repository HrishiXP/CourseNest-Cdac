using CourseNest.Models.DTOs;
using CourseNest.Models;
using CourseNest;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHomeRepository _homeRepository;

        public HomeController(ILogger<HomeController> logger, IHomeRepository homeRepository)
        {
            _homeRepository = homeRepository;
            _logger = logger;
        }

        public async Task<IActionResult> Index(string sterm = "", int categoryId = 0)
        {
            IEnumerable<Course> courses = await _homeRepository.GetCourse(sterm, categoryId);
            IEnumerable<Category> categories = await _homeRepository.Categories();
            CourseDisplayModel courseModel = new CourseDisplayModel
            {
                Courses = courses,
                Categories = categories,
                STerm = sterm,
                CategoryId = categoryId
            };
            if (courseModel == null)
            {
                return NotFound();
            }
            return Ok(courseModel);
        }

        public IActionResult Privacy()
        {
            return Ok();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            if (new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier } == null)
            {
                return NotFound();
            }
            return Ok(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });

        }

    }
}
