using HMSApi.Modules.Doctors.DTOs;

namespace HMSApi.Modules.Doctors.Services;

public interface IScheduleService : IBaseService<ScheduleDto, CreateScheduleDto, UpdateScheduleDto>{}