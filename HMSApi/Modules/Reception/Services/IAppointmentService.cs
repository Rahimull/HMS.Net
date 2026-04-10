using HMSApi.Modules.Reception.DTOs;

namespace HMSApi.Modules.Reception.Services;

public interface IAppointmentService : IBaseService<AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto>{}