using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HMSApi.Models;
using Microsoft.EntityFrameworkCore;

[Index(nameof(RecordNumber), IsUnique = true)]
[Index(nameof(PatientId), IsUnique = true)]
public class MedicalRecord : BaseEntity
{
    [MaxLength(50), Required]
    public string RecordNumber { get; set; } = null!;

    public int PatientId { get; set; }
    public Patient Patient { get; set; } = null!;
}