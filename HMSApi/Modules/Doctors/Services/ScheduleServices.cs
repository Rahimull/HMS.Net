using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Doctors.Services;


public class ScheduleService : BaseService<Schedules, ScheduleDto, CreateScheduleDto, UpdateScheduleDto>, IScheduleService
{
    public ScheduleService(ISchedulesRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Schedules> BuildSpecification(QueryParams query)
    {
        throw new NotImplementedException();
    }
}