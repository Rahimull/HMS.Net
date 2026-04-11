using System.Linq.Expressions;

namespace HMSApi.Models;


public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria { get; }
    List<Expression<Func<T, object>>> Includes { get; }

    int? Skip { get; }
    int? Take { get; }

    Expression<Func<T, object>>? OrderBy {get;}
    Expression<Func<T, object>>? OrderByDescending {get;}
}