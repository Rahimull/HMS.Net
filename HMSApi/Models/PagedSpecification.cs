using HMSApi.Models;
using System.Linq.Expressions;

namespace HMSApi.Specifications;

public abstract class PagedSpecification<T> : BaseSpecification<T>
    where T : BaseEntity
{
    protected PagedSpecification(QueryParams query)
    {
        // ✅ Pagination (generic)
        ApplyPaging(
            query.Pagination.PageIndex,
            query.Pagination.PageSize
        );
    }

    protected void ApplySorting(
        QueryParams query,
        Dictionary<string, Expression<Func<T, object>>> columns
    )
    {
        if (query.Sorting == null || string.IsNullOrWhiteSpace(query.Sorting.SortBy))
        {
            ApplyOrderByDescending(columns.Values.First());
            return;
        }

        if (!columns.TryGetValue(query.Sorting.SortBy.ToLower(), out var column))
        {
            ApplyOrderByDescending(columns.Values.First());
            return;
        }

        if (query.Sorting.SortBy == "desc")
            ApplyOrderByDescending(column);
        else
            ApplyOrderBy(column);
    }
}