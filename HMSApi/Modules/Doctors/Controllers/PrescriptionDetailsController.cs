using HMSApi.Controllers;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Doctors.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PrescriptionDetailsController: BaseController<IPrescriptionDetailsService, PrescriptionDetailsDto, CreatePrescriptionDetailsDto, UpdatePrescriptionDetailsDto>
{
    public PrescriptionDetailsController(IPrescriptionDetailsService service) : base(service)
    {
        
    }
}