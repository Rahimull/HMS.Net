using HMSApi.Models;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Specifications;

public class ConsultationSpecification : BaseSpecification<Consultation>
{


    public ConsultationSpecification(QueryParams query)
    {

        /* ---------- Add navigation ---------- */
        AddInclude(p=> p.Patient);
        AddInclude(d=> d.Doctor);


        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.Doctor.FirstName ?? "").Contains(term) ||
                (d.Doctor.LastName ?? "").Contains(term)
            // d.Name.Contains(term) ||
            // d.Description.Contains(term)
            );
        }

        /* ---------- SORTING ---------- */
        if (!string.IsNullOrWhiteSpace(query.Sorting?.SortBy))
        {
            switch (query.Sorting.SortBy.ToLower())
            {
                case "name":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Doctor.FirstName);
                    else
                        ApplyOrderBy(d => d.Doctor.LastName);
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