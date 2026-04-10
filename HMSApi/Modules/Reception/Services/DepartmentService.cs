using AutoMapper;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Repositories;

namespace HMSApi.Modules.Reception.Services;


public class DepartmentService : BaseService<Department, DepartmentDto, CreateDepartmentDto, UpdateDepartmentDto>, IDepartmentService
{
    public DepartmentService(IDepartmentRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}