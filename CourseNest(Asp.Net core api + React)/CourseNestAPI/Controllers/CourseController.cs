using CourseNest.Models.DTOs;
using CourseNest.Models;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using CourseNest.Constants;
//using CourseNest.Shared;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = nameof(Roles.Admin))]
    [Authorize(Policy = "AllowAnonymous")]
    //[Authorize]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepo;
        private readonly ICategoryRepository _categoryRepo;
     //   private readonly IFileService _fileService;

        public CourseController(ICourseRepository courseRepo, ICategoryRepository categoryRepo/*IFileService fileService*/)
        {
            _courseRepo = courseRepo;
            _categoryRepo = categoryRepo;
         //   _fileService = fileService;
        }

        // Get all courses
        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseRepo.GetCourse();
            if (courses == null || !courses.Any())
            {
                return NotFound("No courses found.");
            }
            return Ok(courses);
        }

        // Get a form for adding a new course
        [HttpGet("add")]
        public async Task<IActionResult> AddCourseForm()
        {
            var categorySelectList = (await _categoryRepo.GetCategories()).Select(category => new SelectListItem
            {
                Text = category.CategoryName,
                Value = category.Id.ToString(),
            }).ToList();

            var courseToAdd = new CourseDTO { CategoryList = categorySelectList };
            return Ok(courseToAdd);
        }

        // Add a new course
        [HttpPost("add")]
        public async Task<IActionResult> AddCourse(CourseDTO courseToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
              /*  if (courseToAdd.ImageFile != null)
                {
                    if (courseToAdd.ImageFile.Length > 1 * 1024 * 1024)
                    {
                        throw new InvalidOperationException("Image file cannot exceed 1 MB");
                    }

                    string[] allowedExtensions = { ".jpeg", ".jpg", ".png" };
                    string imageName = await _fileService.SaveFile(courseToAdd.ImageFile, allowedExtensions);
                   courseToAdd.Image = imageName;
                }*/
              
                var course = new Course
                {
                    CourseName = courseToAdd.CourseName,
                    InstructorName = courseToAdd.InstructorName,
                  //  Image = courseToAdd.Image,
                    CategoryId = courseToAdd.CategoryId,
                    CourseFee = courseToAdd.CourseFee
                };

                await _courseRepo.AddCourse(course);
                return Ok(new { message = "Course added successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred: {ex.Message}");
                return BadRequest(new { message = ex.Message });
            }
        }

        // Get course details for update
        [HttpGet("update/{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _courseRepo.GetCourseById(id);
            if (course == null)
            {
                return NotFound($"Course with id: {id} not found");
            }

            var categorySelectList = (await _categoryRepo.GetCategories()).Select(category => new SelectListItem
            {
                Text = category.CategoryName,
                Value = category.Id.ToString(),
                Selected = category.Id == course.CategoryId
            }).ToList();

            var courseToUpdate = new CourseDTO
            {
                Id = course.Id,
                CategoryList = categorySelectList,
                CourseName = course.CourseName,
                InstructorName = course.InstructorName,
                CategoryId = course.CategoryId,
                CourseFee = course.CourseFee,
               // Image = course.Image
            };

            return Ok(courseToUpdate);
        }

        // Update an existing course
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromForm] CourseDTO courseToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingCourse = await _courseRepo.GetCourseById(id);
                if (existingCourse == null)
                {
                    return NotFound($"Course with id: {id} not found");
                }

                // Update course properties from the DTO
                existingCourse.CourseName = courseToUpdate.CourseName;
                existingCourse.InstructorName = courseToUpdate.InstructorName;
                existingCourse.CategoryId = courseToUpdate.CategoryId;
                existingCourse.CourseFee = courseToUpdate.CourseFee;

                await _courseRepo.UpdateCourse(existingCourse);

                return Ok(new { message = "Course updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        // Delete a course
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            try
            {
                var course = await _courseRepo.GetCourseById(id);
                if (course == null)
                {
                    return NotFound($"Course with id: {id} not found");
                }

                await _courseRepo.DeleteCourse(course);

              /*  if (!string.IsNullOrWhiteSpace(course.Image))
                {
                    _fileService.DeleteFile(course.Image);
                }*/

                return Ok(new { message = "Course deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
              