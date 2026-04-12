using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;

namespace HMSApi.Modules.Doctors.Services;


public class DiagnosisService : BaseService<Diagnosis, DiagnosisDto, CreateDiagnosisDto, UpdateDiagnosisDto>, IDiagnosisService
{
    public DiagnosisService(IDiagnosisRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Diagnosis> BuildSpecification(QueryParams query)
    {
        throw new NotImplementedException();
    }
}