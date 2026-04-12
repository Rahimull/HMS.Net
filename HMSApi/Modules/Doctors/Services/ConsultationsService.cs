using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;

namespace HMSApi.Modules.Doctors.Services;


public class ConsultationService : BaseService<Consultation, ConsultationDto, CreateConsultationDto, UpdateConsultationDto>, IConsultationService
{
    public ConsultationService(IConsultationRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Consultation> BuildSpecification(QueryParams query)
    {
        throw new NotImplementedException();
    }
}