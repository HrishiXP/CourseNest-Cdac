using System.ComponentModel.DataAnnotations;

namespace CourseNestAPI.Models.DTOs
{
    public class UpdateProfileDTO
    {

        [EmailAddress]
        public string Email { get; set; }

        public string UserName { get; set; }

    }
}
