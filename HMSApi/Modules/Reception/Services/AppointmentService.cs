using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Reception.DTOs;
using HMSApi.Modules.Reception.Entities;
using HMSApi.Modules.Reception.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Reception.Services;


public class AppointmentService : BaseService<Appointment, AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto>, IAppointmentService
{
    public AppointmentService(IAppointmentRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Appointment> BuildSpecification(QueryParams query)
    {
        throw new NotImplementedException();
    }
}