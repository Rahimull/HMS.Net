using HMSApi.Modules.Common.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Common.Services;

public interface IUnitService : IBaseService<UnitDto, CreateUnitDto, UpdateUnitDto>{}