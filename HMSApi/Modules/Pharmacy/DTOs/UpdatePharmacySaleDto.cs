namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdatePharmacySaleDto(
        DateTime SaleDate,
       decimal TotalAmount,
       string? Notes,
       int PatientId,
       int DoctorId,
       int PrescriptionId
);