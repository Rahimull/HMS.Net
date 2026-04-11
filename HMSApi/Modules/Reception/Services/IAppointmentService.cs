using HMSApi.Modules.Reception.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Reception.Services;

public interface IAppointmentService : IBaseService<AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto>{}