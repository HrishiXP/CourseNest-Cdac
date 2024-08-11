using Microsoft.AspNetCore.Identity;

namespace CourseNestAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int Id;

        public string Username;

        public string Fullname;

        public string email;

        public string password;

        public string phone;

        public string Role;


    }
}
