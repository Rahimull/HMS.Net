using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Reception.Services;


public class PatientService
    : BaseService<Patient, PatientDto, CreatePatientDto, UpdatePatientDto>, IPatientService
{
    public PatientService(IPatientRepository repo, IMapper mapper)
        : base(repo, mapper) { }

    protected override ISpecification<Patient> BuildSpecification(QueryParams query)
    {
        return new PatientSpecification(query);
    }

    // ✅ business logic فقط اینجا
    public async Task AdmitPatient(int patientId)
    {
        // rules...
    }
}