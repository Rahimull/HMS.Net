using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Pharmacy.Services;


public class PharmacySaleDetailsService
    : BaseService<PharmacySalesdetails, PharmacySaleDetailsDto, CreatePharmacySaleDetailsDto, UpdatePharmacySaleDetailsDto>, IPharmacySaleDetailsService
{
    public PharmacySaleDetailsService(IPharmacySaleDetailsRepository repo, IMapper mapper)
        : base(repo, mapper) { }

    protected override ISpecification<PharmacySalesdetails> BuildSpecification(QueryParams query)
    {
        return new PharmacySaleDetailsSpecification(query);
    }

    // ✅ business logic فقط اینجا
    public async Task AdmitPharmacySaleDetails(int PharmacySaleDetailsId)
    {
        // rules...
    }
}