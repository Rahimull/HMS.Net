using AutoMapper;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Repositories;

namespace HMSApi.Mudoles.Reception.Services;


public class PatientService : BaseService<Patient, PatientDto, CreatePatientDto, UpdatePatientDto>, IPatientService
{
    public PatientService(IPatientRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}