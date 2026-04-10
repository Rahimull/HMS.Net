using HMSApi.Controllers;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Reception.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController
    : BaseController<
        IDepartmentService,
        DepartmentDto,
        CreateDepartmentDto,
        UpdateDepartmentDto>
{
    public DepartmentController(IDepartmentService service)
        : base(service)
    {
    }
}