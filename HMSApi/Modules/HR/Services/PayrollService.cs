using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Entities;
using HMSApi.Modules.HR.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.HR.Services;
using HMSApi.Specifications;


public class PayrollService : BaseService<Payrolls, PayrollDto, CreatePayrollDto, UpdatePayrollDto>, IPayrollService
{
    public PayrollService(IPayrollRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Payrolls> BuildSpecification(QueryParams query)
    {
        return new PayrollSpecification(query);
    }
}