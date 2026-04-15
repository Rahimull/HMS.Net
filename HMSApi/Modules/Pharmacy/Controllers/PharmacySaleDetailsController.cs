using HMSApi.Controllers;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Pharmacy.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PharmacySaleDetailsController: BaseController<IPharmacySaleDetailsService, PharmacySaleDetailsDto, CreatePharmacySaleDetailsDto, UpdatePharmacySaleDetailsDto>
{
    public PharmacySaleDetailsController(IPharmacySaleDetailsService service) : base(service)
    {
        
    }
}