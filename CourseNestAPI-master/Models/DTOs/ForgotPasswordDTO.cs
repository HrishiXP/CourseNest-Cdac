﻿using System.ComponentModel.DataAnnotations;

namespace CourseNestAPI.Models.DTOs
{
    public class ForgotPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
