

namespace HMSApi.Modules.Store.DTOs;

using System.Text.Json.Serialization;
using HMSApi.Common.Enums;

public record UpdateItemStockDto(
    int Quantity,
    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    StockMovementType Type,
    string? BatchNumber,
    DateOnly? ExpiryDate,
    string? Notes
);