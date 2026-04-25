
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;

public record UpdateItemStockDto(
    int ItemId,
    int Quantity,
    StockMovementType Type,
    string? BatchNumber,
    DateOnly? ExpiryDate,
    string? Notes
);