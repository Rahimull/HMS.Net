
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;

public record CreateItemStockDto(
    int ItemId,
    int Quantity,
    StockMovementType Type,
    string? BatchNumber,
    DateOnly? ExpiryDate,
    string? Notes
);