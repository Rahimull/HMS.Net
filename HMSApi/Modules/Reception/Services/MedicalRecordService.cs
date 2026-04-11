using AutoMapper;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Reception.Services;


public class MedicalRecordService : BaseService<MedicalRecord, MedicalRecordDto, CreateMedicalRecordDto, UpdateMedicalRecordDto>, IMedicalRecordService
{
    public MedicalRecordService(IMedicalRecordRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}