using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Pharmacy.Services;
using HMSApi.Specifications;


public class PharmacySaleService : BaseService<PharmacySales, PharmacySaleDto, CreatePharmacySaleDto, UpdatePharmacySaleDto>, IPharmacySaleService
{
    public PharmacySaleService(IPharmacySaleRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<PharmacySales> BuildSpecification(QueryParams query)
    {
        return new PharmacySaleSpecification(query);
    }
}