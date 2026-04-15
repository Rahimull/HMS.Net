namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdatePharmacySaleDto(
        DateTime SaleDate,
       decimal TotalAmoun,
       string? Notes,
       int PatientId,
       int DoctorId,
       int PrescriptionId
);