namespace HMSApi.Modules.Pharmacy.DTOs;


public record CreateMedicineStockDto(
       string BatchNumber,
       int Quantity,
       DateOnly ExpiryDate,
       string? location,
       DateTime updatedAt,
       int MedicineId
);