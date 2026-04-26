using HMSApi.Models;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Specifications;

public class CurrentStockSpecification : BaseSpecification<CurrentStock>
{
    public CurrentStockSpecification(QueryParams query)
    {
        /* ---------- SEARCH ---------- */
        AddInclude(u => u.Item);
        
        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                d.Quantity.ToString().Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.LastUpdate);
                    else
                        ApplyOrderBy(d => d.LastUpdate);
                    break;

                case "id":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.ItemId);
                    else
                        ApplyOrderBy(d => d.ItemId);
                    break;

                default:
                    ApplyOrderByDescending(d => d.ItemId);
                    break;
            }
        }
        else
        {
            ApplyOrderByDescending(d => d.ItemId);
        }

        /* ---------- PAGINATION ---------- */
        ApplyPaging(
            query.Pagination.PageIndex,
            query.Pagination.PageSize
        );
    }
}