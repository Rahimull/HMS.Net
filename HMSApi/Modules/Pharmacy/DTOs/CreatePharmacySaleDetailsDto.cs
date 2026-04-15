namespace HMSApi.Modules.Pharmacy.DTOs;


public record CreatePharmacySaleDetailsDto(
       string? BatchNumber,
       int Quantity,
       decimal UnitPrice,
       decimal TotalPrice,
       int PharmacySaleId,
       int MedicineId
);