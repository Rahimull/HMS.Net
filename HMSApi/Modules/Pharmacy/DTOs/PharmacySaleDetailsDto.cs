namespace HMSApi.Modules.Pharmacy.DTOs;


public record PharmacySaleDetailsDto(
       int Id,
       string? BatchNumber,
       int Quantity,
       decimal UnitPrice,
       decimal TotalPrice,
       int PharmacySaleId,
       int MedicineId,
       string PharmacySaleName,
       string MedicineName
);