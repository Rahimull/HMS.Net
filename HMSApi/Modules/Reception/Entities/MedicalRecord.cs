using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HMSApi.Mudoles.Reception.Entities;

// RecordNumber is Index in the MedicalRecord
[Index(nameof(RecordNumber), IsUnique = true)]
public class MedicalRecord : BaseEntity
{
    // Record Number this Indixing
    [MaxLength(50)]
    [Required]
    public string RecordNumber { get; set; } = null!;

    // FK from Patient
    [Required]
    public int PatientId { get; set; }

    // one-to-one navigation from Patient
    [ForeignKey(nameof(PatientId))]
    public Patient Patient { get; set; } = null!;
}