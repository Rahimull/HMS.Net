public class ConsultationDto
{
    public int Id { get; set; }
    public DateTime VisitDate { get; set; }
    public string ChiefComplaint { get; set; } = null!;
    public string? Notes { get; set; }
    public string Examination { get; set; }= null!;
    public int DoctorId { get; set; }
    public string? DoctorName { get; set; }
    public int PatientId { get; set; }
    public string? PatientName { get; set; }
}