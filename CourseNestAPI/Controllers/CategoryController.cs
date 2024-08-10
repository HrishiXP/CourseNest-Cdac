using CourseNest.Models.DTOs;
using CourseNest.Models;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using CourseNest.Constants;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(Roles.Admin))]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _categoryRepo.GetCategories();
            if (categories == null)
            {
                return NotFound();
            }
            return Ok(categories);
        }

        public IActionResult AddCategory()
        {
            
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(CategoryDTO category)
        {
            if (!ModelState.IsValid)
            {
                if (category == null)
                {
                    return NotFound();
                }
                return Ok(category);
            }
            try
            {
                var categoryToAdd = new Category { CategoryName = category.CategoryName, Id = category.Id };
                await _categoryRepo.AddCategory(categoryToAdd);
                return Ok(new { message = "Category added successfully" });
                return RedirectToAction(nameof(AddCategory));
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Category could not added!" });
                if (category == null)
                {
                    return NotFound();
                }
                return Ok(category);
            }

        }

        public async Task<IActionResult> UpdateCategory(int id)
        {
            var category = await _categoryRepo.GetCategoryById(id);
            if (category is null)
                throw new InvalidOperationException($"Category with id: {id} does not found");
            var categoryToUpdate = new CategoryDTO
            {
                Id = category.Id,
                CategoryName = category.CategoryName
            };
            if (categoryToUpdate == null)
            {
                return NotFound();
            }
            return Ok(categoryToUpdate);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateCategory(CategoryDTO categoryToUpdate)
        {
            if (!ModelState.IsValid)
            {
                if (categoryToUpdate == null)
                {
                    return NotFound();
                }
                return Ok(categoryToUpdate);
            }
            try
            {
                var category = new Category { CategoryName = categoryToUpdate.CategoryName, Id = categoryToUpdate.Id };
                await _categoryRepo.UpdateCategory(category);
                return Ok(new { message = "Category is updated successfully" });
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Category could not updated!" });
                if (categoryToUpdate == null)
                {
                    return NotFound();
                }
                return Ok(categoryToUpdate);
            }

        }

        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoryRepo.GetCategoryById(id);
            if (category is null)
                throw new InvalidOperationException($"Category with id: {id} does not found");
            await _categoryRepo.DeleteCategory(category);
            return RedirectToAction(nameof(Index));

        }
    }
}
