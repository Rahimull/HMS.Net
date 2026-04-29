namespace HMSApi.Modules.Pharmacy.DTOs;


public record SaleDto(
       int Id,
       DateTime SaleDate,
       decimal TotalAmount,
       string? Notes,
       int PatientId,
       int DoctorId,
       int PrescriptionId,
       string? PatientName,
       string? DoctorName,
       string? PrescriptionName
);