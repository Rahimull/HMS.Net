using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Doctors.Services;

public interface IPrescriptionService : IBaseService<PrescriptionDto, CreatePrescriptionDto, UpdatePrescriptionDto>{}