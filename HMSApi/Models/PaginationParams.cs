using System.Text.Json.Serialization;

namespace HMSApi.Models;

public class PaginationParams
{
    private const int MaxPageSize = 100;

    [JsonPropertyName("pageIndex")]
    public int PageIndex { get; set; } = 0;

    private int _pageSize = 10;

    [JsonPropertyName("pageSize")]
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value < 1
            ? 10
            : value > MaxPageSize
                ? MaxPageSize
                : value;
    }
}