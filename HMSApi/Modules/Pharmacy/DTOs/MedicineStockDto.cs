namespace HMSApi.Modules.Pharmacy.DTOs;


public record MedicineStockDto(
        int Id,
       string BatchNumber,
       int Quantity,
       DateOnly ExpiryDate,
       string? location,
       DateTime updatedAt,
       int MedicineId,
       string MedicineName
);