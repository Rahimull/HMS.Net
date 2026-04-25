
using System.Text.Json.Serialization;
using HMSApi.Common.Enums;

namespace HMSApi.Modules.Store.DTOs;


public record CreateItemStockDto(
    int ItemId,
    int Quantity,

    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    StockMovementType Type,
    string? BatchNumber,
    DateOnly? ExpiryDate,
    string? Notes,
    int? ReferenceId,

     [property: JsonConverter(typeof(JsonStringEnumConverter))]
    StockReferenceType? ReferenceType
);