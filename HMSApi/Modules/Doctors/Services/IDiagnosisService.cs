using HMSApi.Modules.Doctors.DTOs;

namespace HMSApi.Modules.Doctors.Services;

public interface IDiagnosisService : IBaseService<DiagnosisDto, CreateDiagnosisDto, UpdateDiagnosisDto>{}