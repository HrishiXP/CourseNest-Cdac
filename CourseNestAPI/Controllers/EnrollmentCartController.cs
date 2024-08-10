using CourseNest.Models.DTOs;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseNestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EnrollmentCartController : ControllerBase
    {
        private readonly IEnrollmentCartRepository _cartRepo;

        public EnrollmentCartController(IEnrollmentCartRepository cartRepo)
        {
            _cartRepo = cartRepo;
        }

        // Add an item to the enrollment cart
        [HttpPost("add-item")]
        public async Task<IActionResult> AddItem(int courseId, int qty = 1, int redirect = 0)
        {
            var cartCount = await _cartRepo.AddItem(courseId, qty);
            if (redirect == 0)
            {
                return Ok(cartCount);
            }
            return RedirectToAction(nameof(GetUserEnrollmentCart));
        }

        // Remove an item from the enrollment cart
        [HttpDelete("remove-item")]
        public async Task<IActionResult> RemoveItem(int courseId)
        {
            var cartCount = await _cartRepo.RemoveItem(courseId);
            return RedirectToAction(nameof(GetUserEnrollmentCart));
        }

        // Get the current user's enrollment cart
        [HttpGet("user-cart")]
        public async Task<IActionResult> GetUserEnrollmentCart()
        {
            var cart = await _cartRepo.GetUserEnrollmentCart();
            if (cart == null)
            {
                return NotFound("Enrollment cart not found.");
            }
            return Ok(cart);
        }

        // Get the total number of items in the enrollment cart
        [HttpGet("total-items")]
        public async Task<IActionResult> GetTotalItemInEnrollmentCart()
        {
            int cartItemCount = await _cartRepo.GetEnrollmentCartItemCount();
            return Ok(cartItemCount);
        }

        // Checkout endpoint (GET method for viewing the checkout page)
        [HttpGet("checkout")]
        public IActionResult Checkout()
        {
            return Ok();
        }

        // Checkout endpoint (POST method for processing the checkout)
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CheckoutModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isCheckedOut = await _cartRepo.DoCheckout(model);
            if (!isCheckedOut)
            {
                return RedirectToAction(nameof(EnrollmentFailure));
            }
            return RedirectToAction(nameof(EnrollmentSuccess));
        }

        // Display enrollment success message
        [HttpGet("success")]
        public IActionResult EnrollmentSuccess()
        {
            return Ok(new { message = "Enrollment successful!" });
        }

        // Display enrollment failure message
        [HttpGet("failure")]
        public IActionResult EnrollmentFailure()
        {
            return Ok(new { message = "Enrollment failed." });
        }
    }
}
