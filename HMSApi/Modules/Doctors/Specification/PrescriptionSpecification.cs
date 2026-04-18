using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Specifications;

public class PrescriptionSpecification : BaseSpecification<Prescriptions>
{
    public PrescriptionSpecification(QueryParams query)
    {
         /* ---------- SEARCH ---------- */
         AddInclude(c => c.Consultation);
         AddInclude(p => p.Patient);
         AddInclude(d => d.Doctor);

        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.Patient.FirstName ?? "").Contains(term) ||
                (d.Patient.LastName ?? "").Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Id);
                    else
                        ApplyOrderBy(d => d.Patient.LastName);
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