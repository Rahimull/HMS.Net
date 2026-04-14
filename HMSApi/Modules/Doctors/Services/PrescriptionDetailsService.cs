using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Doctors.Services;


public class PrescriptionDetailsService : BaseService<PrescriptionDetails, PrescriptionDetailsDto, CreatePrescriptionDetailsDto, UpdatePrescriptionDetailsDto>, IPrescriptionDetailsService
{
    public PrescriptionDetailsService(IPrescriptionDetailsRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<PrescriptionDetails> BuildSpecification(QueryParams query)
    {
        return new PrescriptionDetailsSpecification(query);
    }
}