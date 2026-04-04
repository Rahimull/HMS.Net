using HMSApi.Controllers;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Mudoles.Reception.Controller;


[ApiController]
[Route("api/[controller]")]
public class DepartmentController: BaseController<IDepartmentService, DepartmentDto, CreateDepartmentDto, UpdateDepartmentDto>
{
    public DepartmentController(IDepartmentService service) : base(service)
    {
        
    }
}