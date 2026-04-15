namespace HMSApi.Modules.Pharmacy.DTOs;


public record UpdateMedicineStockDto(
       string BatchNumber,
       int Quantity,
       DateOnly ExpiryDate,
       string? location,
       DateTime updatedAt,
       int MedicineId
);