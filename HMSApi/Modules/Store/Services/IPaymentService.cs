using HMSApi.Modules.Finance.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Finance.Services;

public interface IPaymentService : IBaseService<PaymentDto, CreatePaymentDto, UpdatePaymentDto>{}