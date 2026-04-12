using AutoMapper;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
namespace HMSApi.Modules.Reception.Services;


public class DepartmentService : BaseService<Department, DepartmentDto, CreateDepartmentDto, UpdateDepartmentDto>, IDepartmentService
{
    public DepartmentService(IDepartmentRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }


    

  // 🔥 VERY IMPORTANT
    protected override ISpecification<Department> BuildSpecification(QueryParams query)
    {
        return new DepartmentSpecification(query);
    }


}