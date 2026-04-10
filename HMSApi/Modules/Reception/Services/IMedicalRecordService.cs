using HMSApi.Modules.Reception.DTOs;

namespace HMSApi.Modules.Reception.Services;

public interface IMedicalRecordService : IBaseService<MedicalRecordDto, CreateMedicalRecordDto, UpdateMedicalRecordDto>{}