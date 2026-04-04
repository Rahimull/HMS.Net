using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Mudoles.Reception.Entities;
public class Doctor : BaseEntity<int>
{
    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = null!;

    [Precision(10,2)]
    public decimal Fee { get; set; }

    [Required]
    [ForeignKey(nameof(DepartmentId))]
    public int DepartmentId { get; set; }

    [Required]
    public Department Department { get; set; } = null!;

    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}