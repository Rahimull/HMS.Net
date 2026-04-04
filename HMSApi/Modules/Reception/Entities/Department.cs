using System.ComponentModel.DataAnnotations;
using HMSApi.Models;

namespace HMSApi.Mudoles.Reception.Entities;


public class Department : BaseEntity<int>
{
    [Required]
    [MaxLength(100)]
    public string Name  { get; set; } = null!;
    [MaxLength(255)]
    public string? Description { get; set; }
}