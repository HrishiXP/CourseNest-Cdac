using CourseNest.Models.DTOs;
using CourseNest.Models;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CourseNest.Constants;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = nameof(Roles.Admin))]
    [Authorize(Policy = "AllowAnonymous")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        // Get all categories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepo.GetCategories();
            if (categories == null)
            {
                return NotFound();
            }
            return Ok(categories);
        }

        // Get a form for adding a new category (if needed, otherwise remove this method)
        [HttpGet("add")]
        public IActionResult AddCategoryForm()
        {
            return Ok(); // Assuming this returns some form data or structure
        }

        // Add a new category
        [HttpPost]
        public async Task<IActionResult> AddCategory(CategoryDTO category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoryToAdd = new Category
            {
                CategoryName = category.CategoryName,
                Id = category.Id
            };

            await _categoryRepo.AddCategory(categoryToAdd);
            return Ok(new { message = "Category added successfully" });
        }

        // Get a category by ID (for updating)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryRepo.GetCategoryById(id);
            if (category == null)
            {
                return NotFound($"Category with id: {id} not found");
            }

            var categoryDto = new CategoryDTO
            {
                Id = category.Id,
                CategoryName = category.CategoryName
            };

            return Ok(categoryDto);
        }

        // Update an existing category
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoryDTO categoryToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingCategory = await _categoryRepo.GetCategoryById(id);
            if (existingCategory == null)
            {
                return NotFound($"Category with id: {id} not found");
            }

            existingCategory.CategoryName = categoryToUpdate.CategoryName;

            await _categoryRepo.UpdateCategory(existingCategory);
            return Ok(new { message = "Category updated successfully" });
        }

        // Delete a category
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoryRepo.GetCategoryById(id);
            if (category == null)
            {
                return NotFound($"Category with id: {id} not found");
            }

            await _categoryRepo.DeleteCategory(category);
            return Ok(new { message = "Category deleted successfully" });
        }
    }
}
