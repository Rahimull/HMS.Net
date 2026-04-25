
namespace HMSApi.Modules.Store.DTOs;
using HMSApi.Common.Enums;

public record ItemStockDto(
    int Id,
    int ItemId,
    string ItemName,
    int Quantity,
    StockMovementType Type,
    DateTime Date,
    string? BatchNumber,
    DateOnly? ExpiryDate,
    string? Notes,
    int? ReferenceId,
    StockReferenceType? ReferenceType
);