using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Specifications;

public class DoctorSpecification : BaseSpecification<Doctor>
{
    public DoctorSpecification(QueryParams query)
    {
        /* ---------- Include ---------- */
        AddInclude(d => d.Department);

        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.FirstName ?? "").Contains(term)
            // ||
            // (d.DoctorStatus ?? "").Contains(term)
            // d.Name.Contains(term) ||
            // d.Description.Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "notes":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => (d.FirstName ?? " "));
                    else
                        ApplyOrderBy(d => (d.FirstName ?? ""));
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