using HMSApi.Models;
using HMSApi.Modules.Pharmacy.Entities;

namespace HMSApi.Specifications;

public class SalePaymentSpecification : BaseSpecification<SalePayment>
{
    public SalePaymentSpecification(QueryParams query)
    {
        /* ---------- Include Sale ---------- */
        AddInclude(x => x.Sale);
        


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
                case "Amount":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.Amount);
                    else
                        ApplyOrderBy(d => d.Amount);
                    break;

                case "date":
                    if (query.Sorting.IsDescending)
                        ApplyOrderByDescending(d => d.PaymentDate);
                    else
                        ApplyOrderBy(d => d.PaymentDate);
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