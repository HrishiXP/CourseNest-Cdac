using CourseNest.Models;
using CourseNest.Models.DTOs;

namespace CourseNest.Repositories
{
    public interface IEnrollmentCartRepository
    {
        Task<int> AddItem(int courseId, int qty);
        Task<int> RemoveItem(int courseId);
        Task<EnrollmentCart> GetUserEnrollmentCart();
        Task<int> GetEnrollmentCartItemCount(string userId = "");
        Task<EnrollmentCart> GetEnrollmentCart(string userId);
        Task<bool> DoCheckout(CheckoutModel model);
    }
}
