namespace HMSApi.Modules.Pharmacy.DTOs;


public class SaleDto
{
    public int Id { get; set; }

    public DateTime SaleDate { get; set; }

    public decimal TotalAmount { get; set; }
    public decimal TotalProfit { get; set; }

    public bool IsPaid { get; set; }

    public string? Notes { get; set; }

    public int? PatientId { get; set; }
    public string? PatientName { get; set; }

    public int? DoctorId { get; set; }
    public string? DoctorName { get; set; }

    public int? PrescriptionId { get; set; }

    public List<SaleDetailsDto> Details { get; set; }
        = new();
}