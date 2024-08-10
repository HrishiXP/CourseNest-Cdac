using CourseNest.Models.DTOs;
using CourseNest.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> AddItem(int courseId, int qty = 1, int redirect = 0)
        {
            var cartCount = await _cartRepo.AddItem(courseId, qty);
            if (redirect == 0)
                return Ok(cartCount);
            return RedirectToAction("GetUserEnrollmentCart");
        }

        public async Task<IActionResult> RemoveItem(int courseId)
        {
            var cartCount = await _cartRepo.RemoveItem(courseId);
            return RedirectToAction("GetUserEnrollmentCart");
        }
        public async Task<IActionResult> GetUserEnrollmentCart()
        {
            var cart = await _cartRepo.GetUserEnrollmentCart();
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart);
        }

        public async Task<IActionResult> GetTotalItemInEnrollmentCart()
        {
            int cartItem = await _cartRepo.GetEnrollmentCartItemCount();
            return Ok(cartItem);
        }

        public IActionResult Checkout()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Checkout(CheckoutModel model)
        {
            if (!ModelState.IsValid)
                if (model == null)
                {
                    return NotFound();
                }
            return Ok(model);
            bool isCheckedOut = await _cartRepo.DoCheckout(model);
            if (!isCheckedOut)
                return RedirectToAction(nameof(EnrollmentFailure));
            return RedirectToAction(nameof(EnrollmentSuccess));
        }

        public IActionResult EnrollmentSuccess()
        {
            return Ok();
        }

        public IActionResult EnrollmentFailure()
        {
            return Ok(); 
        }

    }
}
