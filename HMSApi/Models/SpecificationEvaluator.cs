using Microsoft.EntityFrameworkCore;
namespace HMSApi.Models;
public static class SpecificationEvaluator
{
    public static IQueryable<T> GetQuery<T>(
        IQueryable<T> inputQuery,
        ISpecification<T> spec)
        where T : class
    {
        var query = inputQuery;

        // FILTER
        if (spec.Criteria != null)
            query = query.Where(spec.Criteria);

        // INCLUDE
        query = spec.Includes.Aggregate(
            query,
            (current, include) => current.Include(include)
        );

        // ORDER BY
        if (spec.OrderBy != null)
            query = query.OrderBy(spec.OrderBy);

        if (spec.OrderByDescending != null)
            query = query.OrderByDescending(spec.OrderByDescending);

        // PAGINATION
        if (spec.Skip.HasValue)
            query = query.Skip(spec.Skip.Value);

        if (spec.Take.HasValue)
            query = query.Take(spec.Take.Value);

        return query;
    }
}