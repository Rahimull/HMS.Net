using System.Linq.Expressions;

namespace HMSApi.Models;


public class BaseSpecification<T> : ISpecification<T>
{
    public Expression<Func<T, bool>>? Criteria { get; protected set; }

    public List<Expression<Func<T, object>>> Includes { get; } = new();

    public int? Skip { get; private set; }

    public int? Take { get; private set; }

    public Expression<Func<T, object>>? OrderBy { get; private set; }

    public Expression<Func<T, object>>? OrderByDescending { get; private set; }

    protected void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    protected void ApplyPaging(int pageIndex, int pageSize)
    {
        Skip = (pageIndex - 1) * pageSize;
        Take = pageSize;

    }
    protected void ApplayOrderBy(Expression<Func<T, object>> orderBy)
    {
        OrderBy = orderBy;
    }

    protected void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescending)
    {
        OrderByDescending=orderByDescending;
    }
}