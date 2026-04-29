using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Pharmacy.Services;

public interface ISaleDetailsService : IBaseService<SaleDetailsDto, CreateSaleDetailsDto, UpdateSaleDetailsDto>{}