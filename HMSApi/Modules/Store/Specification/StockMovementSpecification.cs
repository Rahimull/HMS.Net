using System.Runtime.CompilerServices;
using HMSApi.Models;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Specifications;

public class StockMovementSpecification : BaseSpecification<StockMovement>
{
    public StockMovementSpecification(QueryParams query)
    {
        /* ---------- Navigation ---------- */
        AddInclude(u => u.ItemStock);
        AddInclude(s => s.ItemStock.Item);
        
        
        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                d.Quantity.ToString().Contains(term) || 
                d.ItemStock.Item.Name.Contains(term) ||
                d.ItemStock.BatchNumber.Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.CreatedAt);
                    else
                        ApplyOrderBy(d => d.CreatedAt);
                    break;

                case "id":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.ItemStockId);
                    else
                        ApplyOrderBy(d => d.ItemStockId);
                    break;

                default:
                    ApplyOrderByDescending(d => d.ItemStockId);
                    break;
            }
        }
        else
        {
            ApplyOrderByDescending(d => d.ItemStockId);
        }

        /* ---------- PAGINATION ---------- */
        ApplyPaging(
            query.Pagination.PageIndex,
            query.Pagination.PageSize
        );
    }
}