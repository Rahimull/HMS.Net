using System.ComponentModel.DataAnnotations;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Mudoles.Reception.Entities;


[Index(nameof(Phone), IsUnique = true)]
public class Patient : BaseEntity<int>
{
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = null!;

    [Range(1, 2)]
    public Gender Gender { get; set; }

    public DateOnly DOB { get; set; }


    [Required]
    [Phone]
    [MaxLength(20)]
    public string Phone { get; set; } = null!;

    [MaxLength(255)]
    public string? Address { get; set; }

    [MaxLength(50)]
    public string? NationalId { get; set; }

    // one-to-one Navivation
    [Required]
    public Appointment Appointment { get; set; } = null!;



}