using CourseNest.Models.DTOs;
using CourseNest.Models;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data;
using CourseNest.Constants;
using CourseNest.Shared;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(Roles.Admin))]
    public class CourseController : ControllerBase
    {

        private readonly ICourseRepository _courseRepo;
        private readonly ICategoryRepository _categoryRepo;
        private readonly IFileService _fileService;

        public CourseController(ICourseRepository courseRepo, ICategoryRepository categoryRepo, IFileService fileService)
        {
            _courseRepo = courseRepo;
            _categoryRepo = categoryRepo;
            _fileService = fileService;
        }

        public async Task<IActionResult> Index()
        {
            var courses = await _courseRepo.GetCourse();
            if (courses == null)
            {
                return NotFound();
            }
            return Ok(courses);
        }

        public async Task<IActionResult> AddCourse()
        {
            var categorySelectList = (await _categoryRepo.GetCategories()).Select(category => new SelectListItem
            {
                Text = category.CategoryName,
                Value = category.Id.ToString(),
            });
            CourseDTO courseToAdd = new() { CategoryList = categorySelectList };
            if (courseToAdd == null)
            {
                return NotFound();
            }
            return Ok(courseToAdd);
        }

        [HttpPost]
        public async Task<IActionResult> AddCourse(CourseDTO courseToAdd)
        {
            var categorySelectList = (await _categoryRepo.GetCategories()).Select(category => new SelectListItem
            {
                Text = category.CategoryName,
                Value = category.Id.ToString(),
            });
            courseToAdd.CategoryList = categorySelectList;

            if (!ModelState.IsValid)
                if (courseToAdd == null)
                {
                    return NotFound();
                }
            return Ok(courseToAdd);

            try
            {
                if (courseToAdd.ImageFile != null)
                {
                    if (courseToAdd.ImageFile.Length > 1 * 1024 * 1024)
                    {
                        throw new InvalidOperationException("Image file can not exceed 1 MB");
                    }
                    string[] allowedExtensions = [".jpeg", ".jpg", ".png"];
                    string imageName = await _fileService.SaveFile(courseToAdd.ImageFile, allowedExtensions);
                    courseToAdd.Image = imageName;
                }
                // manual mapping of CourseDTO -> Course
                Course course = new()
                {
                    Id = courseToAdd.Id,
                    CourseName = courseToAdd.CourseName,
                    InstructorName = courseToAdd.InstructorName,
                    Image = courseToAdd.Image,
                    CategoryId = courseToAdd.CategoryId,
                    CourseFee = courseToAdd.CourseFee
                };
                await _courseRepo.AddCourse(course);
                return Ok(new { message = "Course is added successfully" });
                return RedirectToAction(nameof(AddCourse));
            }
            catch (InvalidOperationException ex)
            {
                return Ok(new { message = ex.Message});
                if (courseToAdd == null)
                {
                    return NotFound();
                }
                return Ok(courseToAdd);
            }
            catch (FileNotFoundException ex)
            {
               return Ok(new { message = ex.Message});
                if (courseToAdd == null)
                {
                    return NotFound();
                }
                return Ok(courseToAdd);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Error on saving data" });
                if (courseToAdd == null)
                {
                    return NotFound();
                }
                return Ok(courseToAdd);
            }
        }

        public async Task<IActionResult> UpdateCourse(int id)
        {
            var course = await _courseRepo.GetCourseById(id);
            if (course == null)
            {
                return Ok(new { message = $"Course with the id: {id} does not found" });
                return RedirectToAction(nameof(Index));
            }
            var categorySelectList = (await _categoryRepo.GetCategories()).Select(category => new SelectListItem
            {
                Text = category.CategoryName,
                Value = category.Id.ToString(),
                Selected = category.Id == course.CategoryId
            });
            CourseDTO courseToUpdate = new()
            {
                CategoryList = categorySelectList,
                CourseName = course.CourseName,
                InstructorName = course.InstructorName,
                CategoryId = course.CategoryId,
                CourseFee = course.CourseFee,
                Image = course.Image
            };
            if (courseToUpdate == null)
            {
                return NotFound();
            }
            return Ok(courseToUpdate);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateCourse(CourseDTO courseToUpdate)
        {
            var categorySelectList = (await _categoryRepo.GetCategories()).Select(category => new SelectListItem
            {
                Text = category.CategoryName,
                Value = category.Id.ToString(),
                Selected = category.Id == courseToUpdate.CategoryId
            });
            courseToUpdate.CategoryList = categorySelectList;

            if (!ModelState.IsValid)
                if (courseToUpdate == null)
                {
                    return NotFound();
                }
            return Ok(courseToUpdate);


            try
            {
                string oldImage = "";
                if (courseToUpdate.ImageFile != null)
                {
                    if (courseToUpdate.ImageFile.Length > 1 * 1024 * 1024)
                    {
                        throw new InvalidOperationException("Image file can not exceed 1 MB");
                    }
                    string[] allowedExtensions = [".jpeg", ".jpg", ".png"];
                    string imageName = await _fileService.SaveFile(courseToUpdate.ImageFile, allowedExtensions);
                    // hold the old image name. Because we will delete this image after updating the new
                    oldImage = courseToUpdate.Image;
                    courseToUpdate.Image = imageName;
                }
                // manual mapping of CourseDTO -> Course
                Course course = new()
                {
                    Id = courseToUpdate.Id,
                    CourseName = courseToUpdate.CourseName,
                    InstructorName = courseToUpdate.InstructorName,
                    CategoryId = courseToUpdate.CategoryId,
                    CourseFee = courseToUpdate.CourseFee,
                    Image = courseToUpdate.Image
                };
                await _courseRepo.UpdateCourse(course);
                // if image is updated, then delete it from the folder too
                if (!string.IsNullOrWhiteSpace(oldImage))
                {
                    _fileService.DeleteFile(oldImage);
                }
                return Ok(new { message = "Course is updated successfully" });
                return RedirectToAction(nameof(Index));
            }
            catch (InvalidOperationException ex)
            {
                return Ok(new { message = ex.Message });
                if (courseToUpdate == null)
                {
                    return NotFound();
                }
                return Ok(courseToUpdate);

            }
            catch (FileNotFoundException ex)
            {
                return Ok(new { message = ex.Message });
                if (courseToUpdate == null)
                {
                    return NotFound();
                }
                return Ok(courseToUpdate);

            }
            catch (Exception ex)
            {
                return Ok(new { message = "Error on saving data" });
                if (courseToUpdate == null)
                {
                    return NotFound();
                }
                return Ok(courseToUpdate);

            }
        }

        public async Task<IActionResult> DeleteCourse(int id)
        {
            try
            {
                var course = await _courseRepo.GetCourseById(id);
                if (course == null)
                {
                    return Ok(new { message = $"Course with the id: {id} does not found" });
                }
                else
                {
                    await _courseRepo.DeleteCourse(course);
                    if (!string.IsNullOrWhiteSpace(course.Image))
                    {
                        _fileService.DeleteFile(course.Image);
                    }
                }
            }
            catch (InvalidOperationException ex)
            {
                return Ok(new { message = ex.Message });
            }
            catch (FileNotFoundException ex)
            {
                return Ok(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Error on deleting the data" });
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
