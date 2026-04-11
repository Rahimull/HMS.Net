using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Doctors.Services;

public interface IScheduleService : IBaseService<ScheduleDto, CreateScheduleDto, UpdateScheduleDto>{}