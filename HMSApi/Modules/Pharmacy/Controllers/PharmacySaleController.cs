using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PharmacySaleController: BaseController<IPharmacySaleService, PharmacySaleDto, CreatePharmacySaleDto, UpdatePharmacySaleDto>
{
    public PharmacySaleController(IPharmacySaleService service) : base(service)
    {
        
    }
}