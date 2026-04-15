using HMSApi.Modules.HR.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.HR.Services;

public interface IShiftService : IBaseService<ShiftDto, CreateShiftDto, UpdateShiftDto>{}