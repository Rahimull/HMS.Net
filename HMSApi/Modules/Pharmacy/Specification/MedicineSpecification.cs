using HMSApi.Models;
using HMSApi.Modules.Pharmacy.Entities;

namespace HMSApi.Specifications;

public class MedicineSpecification : BaseSpecification<Medicines>
{
    public MedicineSpecification(QueryParams query)
    {
        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.Name ?? "").Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Name);
                    else
                        ApplyOrderBy(d => d.Price);
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