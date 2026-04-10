using HMSApi.Modules.Doctors.DTOs;

namespace HMSApi.Modules.Doctors.Services;

public interface IPrescriptionService : IBaseService<PrescriptionDto, CreatePrescriptionDto, UpdatePrescriptionDto>{}