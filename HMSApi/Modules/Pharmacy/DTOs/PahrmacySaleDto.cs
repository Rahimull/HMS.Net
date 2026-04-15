namespace HMSApi.Modules.Pharmacy.DTOs;


public record PharmacySaleDto(
       int Id,
       DateTime SaleDate,
       decimal TotalAmoun,
       string? Notes,
       int PatientId,
       int DoctorId,
       int PrescriptionId,
       string? PatientName,
       string? DoctorName,
       string? PrescriptionName
);