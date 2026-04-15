using HMSApi.Modules.Finance.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Finance.Services;

public interface IInvoiceService : IBaseService<InvoiceDto, CreateInvoiceDto, UpdateInvoiceDto>{}