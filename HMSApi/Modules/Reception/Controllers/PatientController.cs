using HMSApi.Controllers;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Reception.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PatientController: BaseController<IPatientService, PatientDto, CreatePatientDto, UpdatePatientDto>
{
    public PatientController(IPatientService service) : base(service)
    {
        
    }
}