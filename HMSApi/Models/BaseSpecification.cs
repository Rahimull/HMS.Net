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

    // ================= CRITERIA =================

    protected void AddCriteria(Expression<Func<T, bool>> criteria)
    {
        Criteria = Criteria == null
            ? criteria
            : CombineExpressions(Criteria, criteria);
    }

    // ================= INCLUDE =================

    protected void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    // ================= PAGING =================

    protected void ApplyPaging(int pageIndex, int pageSize)
    {
        if (pageIndex < 0) pageIndex = 0;
        if (pageSize <= 0) pageSize = 10;

        Skip = pageIndex * pageSize;
        Take = pageSize;
    }

    // ================= ORDER BY =================

    protected void ApplyOrderBy(Expression<Func<T, object>> orderBy)
    {
        OrderBy = orderBy;
    }

    protected void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescending)
    {
        OrderByDescending = orderByDescending;
    }

    // ================= EXPRESSION COMBINE (FIXED) =================

    private static Expression<Func<T, bool>> CombineExpressions(
        Expression<Func<T, bool>> first,
        Expression<Func<T, bool>> second)
    {
        var parameter = Expression.Parameter(typeof(T));

        var left = ReplaceParameter(first.Body, first.Parameters[0], parameter);
        var right = ReplaceParameter(second.Body, second.Parameters[0], parameter);

        var body = Expression.AndAlso(left, right);

        return Expression.Lambda<Func<T, bool>>(body, parameter);
    }

    // ================= PARAMETER REPLACER (IMPORTANT FIX) =================

    private static Expression ReplaceParameter(
        Expression body,
        ParameterExpression toReplace,
        ParameterExpression newParameter)
    {
        return new ReplaceExpressionVisitor(toReplace, newParameter)
            .Visit(body)!;
    }

    // ================= HELPER CLASS =================

    private class ReplaceExpressionVisitor : ExpressionVisitor
    {
        private readonly ParameterExpression _oldParam;
        private readonly ParameterExpression _newParam;

        public ReplaceExpressionVisitor(
            ParameterExpression oldParam,
            ParameterExpression newParam)
        {
            _oldParam = oldParam;
            _newParam = newParam;
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            return node == _oldParam ? _newParam : base.VisitParameter(node);
        }
    }
}