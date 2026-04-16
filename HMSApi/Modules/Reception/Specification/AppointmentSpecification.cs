using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Specifications;

public class AppointmentSpecification : BaseSpecification<Appointment>
{
    public AppointmentSpecification(QueryParams query)
    {

        /*-----------inclod Patient Doctor, and Department --------------*/
        AddInclude(a => a.Patient);
        AddInclude(a => a.Doctor);
        AddInclude(a => a.Department);


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
                case "notes":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => (d.Notes ?? " "));
                    else
                        ApplyOrderBy(d => (d.Notes ?? ""));
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