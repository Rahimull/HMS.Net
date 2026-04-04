using AutoMapper;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Repositories;

namespace HMSApi.Mudoles.Reception.Services;


public class MedicalRecordService : BaseService<MedicalRecord, MedicalRecordDto, CreateMedicalRecordDto, UpdateMedicalRecordDto>, IMedicalRecordService
{
    public MedicalRecordService(IMedicalRecordRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}