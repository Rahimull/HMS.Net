using HMSApi.Common.Enums;

namespace HMSApi.Modules.Pharmacy.DTOs;


public class CreateSaleDto
{
    public DateTime? SaleDate { get; set; }

    public string? Notes { get; set; }

    // public bool IsPaid { get; set; }
    public decimal PaidAmount { get; set; }

    public int? PatientId { get; set; }

    public int? DoctorId { get; set; }

    public int? PrescriptionId { get; set; }

    public List<CreateSaleDetailsDto> SaleDetails { get; set; }
        = new();
}