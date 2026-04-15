namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdatePharmacySaleDetailsDto(
       string? BatchNumber,
       int Quantity,
       decimal UnitPrice,
       decimal TotalPrice,
       int PharmacySaleId,
       int MedicineId
);