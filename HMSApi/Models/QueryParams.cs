using System.Text.Json.Serialization;

namespace HMSApi.Models;

public class QueryParams
{
    [JsonPropertyName("pagination")]
    public PaginationParams Pagination { get; set; } = new();

    [JsonPropertyName("sorting")]
    public SortingParams Sorting { get; set; } = new();

    [JsonPropertyName("search")]
    public SearchParams Search { get; set; } = new();
}