using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Services;
namespace HMSApi.Modules.Pharmacy.Services;

public interface IPharmacySaleDetailsService : IBaseService<PharmacySaleDetailsDto, CreatePharmacySaleDetailsDto, UpdatePharmacySaleDetailsDto>{}