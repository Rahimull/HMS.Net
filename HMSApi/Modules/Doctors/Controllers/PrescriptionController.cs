using HMSApi.Controllers;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Doctors.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PrescriptionController: BaseController<IPrescriptionService, PrescriptionDto, CreatePrescriptionDto, UpdatePrescriptionDto>
{
    public PrescriptionController(IPrescriptionService service) : base(service)
    {
        
    }
}