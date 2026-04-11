using AutoMapper;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Reception.Services;


public class PatientService : BaseService<Patient, PatientDto, CreatePatientDto, UpdatePatientDto>, IPatientService
{
    public PatientService(IPatientRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}