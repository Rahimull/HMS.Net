using HMSApi.Controllers;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.HR.Controllers;


[ApiController]
[Route("api/[controller]")]
public class EmployeeController: BaseController<IEmployeeService, EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto>
{
    public EmployeeController(IEmployeeService service) : base(service)
    {
        
    }
}