using System.Linq.Expressions;

namespace HMSApi.Models;

public class BaseSpecification<T> : ISpecification<T>
    where T : BaseEntity
{
    public Expression<Func<T, bool>>? Criteria { get; protected set; }

    public List<Expression<Func<T, object>>> Includes { get; } = new();

    public int? Skip { get; private set; }
    public int? Take { get; private set; }

    public Expression<Func<T, object>>? OrderBy { get; private set; }
    public Expression<Func<T, object>>? OrderByDescending { get; private set; }

    // ✅ Always exclude soft-deleted records
    protected BaseSpecification()
    {
        Criteria = x => !x.IsDeleted;
    }

    protected void AddCriteria(Expression<Func<T, bool>> criteria)
    {
        if (Criteria == null)
        {
            Criteria = criteria;
        }
        else
        {
            Criteria = Combine(Criteria, criteria);
        }
    }

    protected void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    // ✅ FIXED: 0-based paging
    protected void ApplyPaging(int pageIndex, int pageSize)
    {
        Skip = pageIndex * pageSize;
        Take = pageSize;
    }

    protected void ApplyOrderBy(Expression<Func<T, object>> orderBy)
    {
        OrderBy = orderBy;
    }

    protected void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescending)
    {
        OrderByDescending = orderByDescending;
    }

    private static Expression<Func<T, bool>> Combine(
    Expression<Func<T, bool>> first,
    Expression<Func<T, bool>> second)
{
    var param = Expression.Parameter(typeof(T));
    var body = Expression.AndAlso(
        Expression.Invoke(first, param),
        Expression.Invoke(second, param)
    );
    return Expression.Lambda<Func<T, bool>>(body, param);
}
}