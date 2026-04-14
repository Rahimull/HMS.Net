using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Specifications;

public class PrescriptionDetailsSpecification : BaseSpecification<PrescriptionDetails>
{
    public PrescriptionDetailsSpecification(QueryParams query)
    {
        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.MedicationName ?? "").Contains(term)
            // ||
            // (d.PrescriptionDetailsStatus ?? "").Contains(term)
            // d.Name.Contains(term) ||
            // d.Description.Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "RecordNumber":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => (d.MedicationName ?? " "));
                    else
                        ApplyOrderBy(d => (d.MedicationName ?? ""));
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