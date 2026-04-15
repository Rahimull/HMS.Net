using HMSApi.Modules.HR.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.HR.Services;

public interface IEmployeeService : IBaseService<EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto>{}