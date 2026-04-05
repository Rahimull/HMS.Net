using HMSApi.Controllers;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Mudoles.Reception.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PatientController: BaseController<IPatientService, PatientDto, CreatePatientDto, UpdatePatientDto>
{
    public PatientController(IPatientService service) : base(service)
    {
        
    }
}