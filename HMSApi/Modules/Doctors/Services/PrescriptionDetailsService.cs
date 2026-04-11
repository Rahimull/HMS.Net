using AutoMapper;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Doctors.Services;


public class PrescriptionDetailsService : BaseService<PrescriptionDetails, PrescriptionDetailsDto, CreatePrescriptionDetailsDto, UpdatePrescriptionDetailsDto>, IPrescriptionDetailsService
{
    public PrescriptionDetailsService(IPrescriptionDetailsRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}