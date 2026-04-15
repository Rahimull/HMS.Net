using HMSApi.Controllers;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.HR.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PayrollController
    : BaseController<
        IPayrollService,
        PayrollDto,
        CreatePayrollDto,
        UpdatePayrollDto>
{
    public PayrollController(IPayrollService service)
        : base(service)
    {
    }
}