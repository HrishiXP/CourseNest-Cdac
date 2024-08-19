﻿using System.ComponentModel.DataAnnotations;

namespace CourseNest.Models.DTOs;

public class CheckoutModel
{
    [Required]
    [MaxLength(30)]
    public string? Name { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(30)]
    public string? Email { get; set; }
    [Required]
    public string? MobileNumber { get; set; }
    [Required]
    [MaxLength(200)]
    public string? Address { get; set; }

    [Required]
    public string? PaymentMethod { get; set; }

    public decimal TotalAmount { get; set; }
}
