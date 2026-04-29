namespace HMSApi.Modules.Pharmacy.DTOs;


public record SaleDetailsDto(
       int Id,
       string? BatchNumber,
       int Quantity,
       decimal UnitPrice,
       decimal TotalPrice,
       int SaleId,
       int MedicineId,
       string SaleName,
       string MedicineName
);