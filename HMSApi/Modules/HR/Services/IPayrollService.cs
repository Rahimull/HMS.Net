using HMSApi.Modules.HR.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.HR.Services;

public interface IPayrollService : IBaseService<PayrollDto, CreatePayrollDto, UpdatePayrollDto>{}