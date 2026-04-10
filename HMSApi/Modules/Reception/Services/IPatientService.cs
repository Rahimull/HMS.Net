using HMSApi.Modules.Reception.DTOs;

namespace HMSApi.Modules.Reception.Services;

public interface IPatientService : IBaseService<PatientDto, CreatePatientDto, UpdatePatientDto>{}