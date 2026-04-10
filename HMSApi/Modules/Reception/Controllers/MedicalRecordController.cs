using HMSApi.Controllers;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Modules.Reception.Controllers;


[ApiController]
[Route("api/[controller]")]
public class MedicalRecordController: BaseController<IMedicalRecordService, MedicalRecordDto, CreateMedicalRecordDto, UpdateMedicalRecordDto>
{
    public MedicalRecordController(IMedicalRecordService service) : base(service)
    {
        
    }
}