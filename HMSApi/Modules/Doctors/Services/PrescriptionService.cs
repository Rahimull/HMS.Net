using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Doctors.Services;


public class PrescriptionService : BaseService<Prescriptions, PrescriptionDto, CreatePrescriptionDto, UpdatePrescriptionDto>, IPrescriptionService
{
    public PrescriptionService(IPrescriptionRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Prescriptions> BuildSpecification(QueryParams query)
    {
        throw new NotImplementedException();
    }
}