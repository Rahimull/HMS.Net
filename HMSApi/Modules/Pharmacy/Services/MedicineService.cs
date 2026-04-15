using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Pharmacy.Services;


public class MedicineService : BaseService<Medicines, MedicineDto, CreateMedicineDto, UpdateMedicineDto>, IMedicineService
{
    public MedicineService(IMedicineRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Medicines> BuildSpecification(QueryParams query)
    {
        return new MedicineSpecification(query);
    }
}