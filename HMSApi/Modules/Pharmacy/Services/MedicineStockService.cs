using AutoMapper;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
namespace HMSApi.Modules.Pharmacy.Services;


public class MedicineStockService : BaseService<MedicineStock, MedicineStockDto, CreateMedicineStockDto, UpdateMedicineStockDto>, IMedicineStockService
{
    public MedicineStockService(IMedicineStockRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }


    

  // 🔥 VERY IMPORTANT
    protected override ISpecification<MedicineStock> BuildSpecification(QueryParams query)
    {
        return new MedicineStockSpecification(query);
    }


}