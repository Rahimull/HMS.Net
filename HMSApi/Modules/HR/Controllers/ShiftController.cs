using HMSApi.Controllers;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.HR.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ShiftController : BaseController<IShiftService, ShiftDto, CreateShiftDto, UpdateShiftDto>
{
    public ShiftController(IShiftService service) : base(service)
    {

    }
}