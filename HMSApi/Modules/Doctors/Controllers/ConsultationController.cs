using HMSApi.Controllers;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Doctors.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ConsultationController: BaseController<IConsultationService, ConsultationDto, CreateConsultationDto, UpdateConsultationDto>
{
    public ConsultationController(IConsultationService service) : base(service)
    {
        
    }
}