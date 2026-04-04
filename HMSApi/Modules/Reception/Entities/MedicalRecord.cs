using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Mudoles.Reception.Entities;


[Index(nameof(RecordNumber), IsUnique = true)]
public class MedicalRecord : BaseEntity<int>
{
    [MaxLength(50)]
    [Required]
    public string RecordNumber { get; set; } = null!;

    [Required]
    public int PatientId { get; set; }

    [ForeignKey(nameof(PatientId))]
    public Patient Patient { get; set; } = null!;
}