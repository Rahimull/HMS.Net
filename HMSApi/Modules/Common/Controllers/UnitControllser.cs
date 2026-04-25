using HMSApi.Controllers;
using HMSApi.Modules.Common.DTOs;
using HMSApi.Modules.Common.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Common.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UnitController : BaseController<IUnitService, UnitDto, CreateUnitDto, UpdateUnitDto>
{
    public UnitController(IUnitService service) : base(service)
    {

    }
}