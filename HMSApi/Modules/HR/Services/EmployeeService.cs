using AutoMapper;
using HMSApi.Modules.HR.Entities;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
namespace HMSApi.Modules.HR.Services;


public class EmployeeService : BaseService<Employees, EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto>, IEmployeeService
{
    public EmployeeService(IEmployeeRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }


    

  // 🔥 VERY IMPORTANT
    protected override ISpecification<Employees> BuildSpecification(QueryParams query)
    {
        return new EmployeeSpecification(query);
    }


}