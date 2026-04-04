using AutoMapper;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Repositories;

namespace HMSApi.Mudoles.Reception.Services;


public class AppointmentService : BaseService<Appointment, AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto>, IAppointmentService
{
    public AppointmentService(IAppointmentRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}