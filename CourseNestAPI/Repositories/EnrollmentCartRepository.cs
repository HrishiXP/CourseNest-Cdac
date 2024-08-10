using CourseNest.Data;
using CourseNest.Models;
using CourseNest.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CourseNest.Repositories
{
    public class EnrollmentCartRepository : IEnrollmentCartRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EnrollmentCartRepository(ApplicationDbContext db, IHttpContextAccessor httpContextAccessor,
            UserManager<IdentityUser> userManager)
        {
            _db = db;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<int> AddItem(int courseId, int qty)
        {
            string userId = GetUserId();
            using var transaction = _db.Database.BeginTransaction();
            try
            {
                if (string.IsNullOrEmpty(userId))
                    throw new UnauthorizedAccessException("user is not logged-in");
                var cart = await GetEnrollmentCart(userId);
                if (cart is null)
                {
                    cart = new EnrollmentCart
                    {
                        UserId= userId
                    };
                    _db.EnrollmentCarts.Add(cart);
                }
                _db.SaveChanges();
                // cart detail section
                var cartItem = _db.EnrollmentCartDetails
                                  .FirstOrDefault(a => a.EnrollmentCartId== cart.Id && a.CourseId== courseId);
                if (cartItem is not null)
                {
                    cartItem.SeatCount += qty;
                }
                else
                {
                    var course = _db.Courses.Find(courseId);
                    cartItem = new EnrollmentCartDetail
                    {
                        CourseId= courseId,
                        EnrollmentCartId= cart.Id,
                        SeatCount = qty,
                        CourseUnitFee= course.CourseFee  // it is a new line after update
                    };
                    _db.EnrollmentCartDetails.Add(cartItem);
                }
                _db.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
            }
            var cartItemCount = await GetEnrollmentCartItemCount(userId);
            return cartItemCount;
        }


        public async Task<int> RemoveItem(int courseId)
        {
            //using var transaction = _db.Database.BeginTransaction();
            string userId = GetUserId();
            try
            {
                if (string.IsNullOrEmpty(userId))
                    throw new UnauthorizedAccessException("user is not logged-in");
                var cart = await GetEnrollmentCart(userId);
                if (cart is null)
                    throw new InvalidOperationException("Invalid cart");
                // cart detail section
                var cartItem = _db.EnrollmentCartDetails
                                  .FirstOrDefault(a => a.EnrollmentCartId== cart.Id && a.CourseId== courseId);
                if (cartItem is null)
                    throw new InvalidOperationException("Not items in cart");
                else if (cartItem.SeatCount == 1)
                    _db.EnrollmentCartDetails.Remove(cartItem);
                else
                    cartItem.SeatCount = cartItem.SeatCount - 1;
                _db.SaveChanges();
            }
            catch (Exception ex)
            {

            }
            var cartItemCount = await GetEnrollmentCartItemCount(userId);
            return cartItemCount;
        }

        public async Task<EnrollmentCart> GetUserEnrollmentCart()
        {
            var userId = GetUserId();
            if (userId == null)
                throw new InvalidOperationException("Invalid userid");
            var shoppingEnrollmentCart = await _db.EnrollmentCarts
                                  .Include(a => a.EnrollmentCartDetails)
                                  .ThenInclude(a => a.Course)
                                  .ThenInclude(a => a.AvailableSeats)
                                  .Include(a => a.EnrollmentCartDetails)
                                  .ThenInclude(a => a.Course)
                                  .ThenInclude(a => a.Category)
                                  .Where(a => a.UserId== userId).FirstOrDefaultAsync();
            return shoppingEnrollmentCart;

        }
        public async Task<EnrollmentCart> GetEnrollmentCart(string userId)
        {
            var cart = await _db.EnrollmentCarts.FirstOrDefaultAsync(x => x.UserId== userId);
            return cart;
        }

        public async Task<int> GetEnrollmentCartItemCount(string userId = "")
        {
            if (string.IsNullOrEmpty(userId)) // updated line
            {
                userId = GetUserId();
            }
            var data = await (from cart in _db.EnrollmentCarts
                              join cartDetail in _db.EnrollmentCartDetails
                              on cart.Id equals cartDetail.EnrollmentCartId
                              where cart.UserId==userId // updated line
                              select new { cartDetail.Id }
                        ).ToListAsync();
            return data.Count;
        }

        public async Task<bool> DoCheckout(CheckoutModel model)
        {
            using var transaction = _db.Database.BeginTransaction();
            try
            {
                // logic
                // move data from cartDetail to enrollment and enrollment detail then we will remove cart detail
                var userId = GetUserId();
                if (string.IsNullOrEmpty(userId))
                    throw new UnauthorizedAccessException("User is not logged-in");
                var cart = await GetEnrollmentCart(userId);
                if (cart is null)
                    throw new InvalidOperationException("Invalid cart");
                var cartDetail = _db.EnrollmentCartDetails
                                    .Where(a => a.EnrollmentCartId== cart.Id).ToList();
                if (cartDetail.Count == 0)
                    throw new InvalidOperationException("EnrollmentCart is empty");
                var pendingRecord = _db.enrollmentStatuses.FirstOrDefault(s => s.EnrollmentStatusName== "Pending");
                if (pendingRecord is null)
                    throw new InvalidOperationException("Enrollmentstatus does not have Pending status");
                var enrollment = new Enrollment
                {
                    UserId= userId,
                    EnrollmentDate= DateTime.UtcNow,
                    Name=model.Name,
                    Email=model.Email,
                    MobileNumber=model.MobileNumber,
                    PaymentMethod=model.PaymentMethod,
                    Address=model.Address,
                    IsPaid=true,
                    EnrollmentStatusId = pendingRecord.Id
                };
                _db.Enrollments.Add(enrollment);
                _db.SaveChanges();
                foreach(var item in cartDetail)
                {
                    var enrollmentDetail = new EnrollmentDetail
                    {
                        CourseId= item.CourseId,
                        EnrollmentId= enrollment.Id,
                        SeatCount = item.SeatCount,
                        CourseUnitFee= item.CourseUnitFee
                    };
                    _db.EnrollmentDetails.Add(enrollmentDetail);

                    // update seats here

                    var seats = await _db.Seatss.FirstOrDefaultAsync(a => a.CourseId== item.CourseId);
                    if (seats == null)
                    {
                        throw new InvalidOperationException("AvailableSeats is null");
                    }

                    if (item.SeatCount > seats.SeatCount)
                    {
                        throw new InvalidOperationException($"Only {seats.SeatCount} items(s) are available in the seats");
                    }
                    // decrease the number of quantity from the seats table
                    seats.SeatCount -= item.SeatCount;
                }
                //_db.SaveChanges();

                // removing the cartdetails
                _db.EnrollmentCartDetails.RemoveRange(cartDetail);
                _db.SaveChanges();
                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        private string GetUserId()
        {
            var principal = _httpContextAccessor.HttpContext.User;
            string userId = _userManager.GetUserId(principal);
            return userId;
        }


    }
}
