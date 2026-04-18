using HMSApi.Models;
using HMSApi.Modules.Pharmacy.Entities;

namespace HMSApi.Specifications;

public class PharmacySaleSpecification : BaseSpecification<PharmacySales>
{
    public PharmacySaleSpecification(QueryParams query)
    {
        /* ---------- Include Patient, Doctors and Prescriptin ---------- */
        AddInclude(p => p.Patient);
        AddInclude(d => d.Doctor);
        AddInclude(pr => pr.Prescription);
        AddInclude(prp => prp.Prescription.Patient);

        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.Notes ?? "").Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Doctor);
                    else
                        ApplyOrderBy(d => d.Doctor);
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