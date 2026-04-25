using HMSApi.Models;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Specifications;

public class PurchaseSpecification : BaseSpecification<Purchases>
{
    public PurchaseSpecification(QueryParams query)
    {
        // ================= INCLUDE =================
        AddInclude(x => x.Supplier);
        AddInclude(x => x.PurchaseDetails);

        // NOTE: Item include should be handled via EF ThenInclude in repository

        // ================= SEARCH =================
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(x =>
                (x.Notes ?? "").Contains(term)
            );
        }

        // ================= SORTING =================
        var sortBy = query.Sorting?.SortBy?.ToLower();
        var isDesc = query.Sorting?.IsDescending ?? true;

        switch (sortBy)
        {
            case "id":
                if (isDesc)
                    ApplyOrderByDescending(x => x.Id);
                else
                    ApplyOrderBy(x => x.Id);
                break;

            case "date":
                if (isDesc)
                    ApplyOrderByDescending(x => x.PurchaseDate);
                else
                    ApplyOrderBy(x => x.PurchaseDate);
                break;

            case "total":
                if (isDesc)
                    ApplyOrderByDescending(x => x.TotalPrice);
                else
                    ApplyOrderBy(x => x.TotalPrice);
                break;

            default:
                ApplyOrderByDescending(x => x.Id);
                break;
        }

        // ================= PAGINATION =================
        var pageIndex = query.Pagination?.PageIndex ?? 0;
        var pageSize = query.Pagination?.PageSize ?? 10;

        ApplyPaging(pageIndex, pageSize);
    }
}