namespace HMSApi.Modules.Pharmacy.DTOs;


public class UpdateSaleDto
{
    public string? Notes { get; set; }

    public bool IsPaid { get; set; }

    public int? PatientId { get; set; }

    public int? DoctorId { get; set; }

    public int? PrescriptionId { get; set; }

    public List<UpdateSaleDetailsDto> Details { get; set; }
        = new();
}