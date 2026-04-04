using AutoMapper;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Repositories;

namespace HMSApi.Mudoles.Reception.Services;


public class DepartmentService : BaseService<Department, DepartmentDto, CreateDepartmentDto, UpdateDepartmentDto>, IDepartmentService
{
    public DepartmentService(IDepartmentRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}