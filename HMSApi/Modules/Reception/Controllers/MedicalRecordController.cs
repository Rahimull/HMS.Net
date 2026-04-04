using HMSApi.Controllers;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Services;
using Microsoft.AspNetCore.Mvc;

namespace HMSApi.Mudoles.Reception.Controller;


[ApiController]
[Route("api/[controller]")]
public class MedicalRecordController: BaseController<IMedicalRecordService, MedicalRecordDto, CreateMedicalRecordDto, UpdateMedicalRecordDto>
{
    public MedicalRecordController(IMedicalRecordService service) : base(service)
    {
        
    }
}