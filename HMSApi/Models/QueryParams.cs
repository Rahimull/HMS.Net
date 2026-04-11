namespace HMSApi.Models;


public class QueryParams
{
    public PaginationParams Pagination { get; set; } = new();
    public SortingParams Sorting { get; set; }  = new();
    public SearchParams Search { get; set; } = new();
}