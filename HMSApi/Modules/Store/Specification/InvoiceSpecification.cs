using HMSApi.Models;
using HMSApi.Modules.Finance.Entities;

namespace HMSApi.Specifications;

public class InvoiceSpecification : BaseSpecification<Invoice>
{
    public InvoiceSpecification(QueryParams query)
    {
        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.Description ?? "").Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Amount);
                    else
                        ApplyOrderBy(d => d.Amount);
                    break;

                case "id":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Id);
                    else
                        ApplyOrderBy(d => d.Id);
                    break;

                default:
                    ApplyOrderByDescending(d => d.Id);
                    break;
            }
        }
        else
        {
            ApplyOrderByDescending(d => d.Id);
        }

        /* ---------- PAGINATION ---------- */
        ApplyPaging(
            query.Pagination.PageIndex,
            query.Pagination.PageSize
        );
    }
}