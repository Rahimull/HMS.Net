namespace HMSApi.Modules.Pharmacy.DTOs;


public record CreateMedicineStock(
       string BatchNumber,
       int Quantity,
       DateOnly ExpiryDate,
       string? location,
       DateTime updatedAt,
       int MedicineId
);