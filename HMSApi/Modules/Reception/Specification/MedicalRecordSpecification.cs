using HMSApi.Models;
using HMSApi.Modules.Reception.Entities;

namespace HMSApi.Specifications;

public class MedicalRecordSpecification : BaseSpecification<MedicalRecord>
{
    public MedicalRecordSpecification(QueryParams query)
    {
        /* ---------- Include Patient ---------- */
        AddInclude(a=> a.Patient);


        /* ---------- SEARCH ---------- */
        var term = query.Search?.SearchTerm;

        if (!string.IsNullOrWhiteSpace(term))
        {
            AddCriteria(d =>
                (d.RecordNumber ?? "").Contains(term)
            // ||
            // (d.MedicalRecordStatus ?? "").Contains(term)
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
                        ApplyOrderByDescending(d => (d.RecordNumber ?? " "));
                    else
                        ApplyOrderBy(d => (d.RecordNumber ?? ""));
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