using HMSApi.Modules.Doctors.DTOs;

namespace HMSApi.Modules.Doctors.Services;

public interface IConsultationService : IBaseService<ConsultationDto, CreateConsultationDto, UpdateConsultationDto>{}