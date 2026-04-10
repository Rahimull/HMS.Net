using HMSApi.Modules.Doctors.DTOs;

namespace HMSApi.Modules.Doctors.Services;

public interface IDoctorService : IBaseService<DoctorDto, CreateDoctorDto, UpdateDoctorDto>{}