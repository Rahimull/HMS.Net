using AutoMapper;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;

namespace HMSApi.Modules.Doctors.Services;


public class DiagnosisService : BaseService<Diagnosis, DiagnosisDto, CreateDiagnosisDto, UpdateDiagnosisDto>, IDiagnosisService
{
    public DiagnosisService(IDiagnosisRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}