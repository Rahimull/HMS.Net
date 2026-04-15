using HMSApi.Controllers;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Store.Controllers;


[ApiController]
[Route("api/[controller]")]
public class SuplierController: BaseController<ISuplierService, SuplierDto, CreateSuplierDto, UpdateSuplierDto>
{
    public SuplierController(ISuplierService service) : base(service)
    {
        
    }
}