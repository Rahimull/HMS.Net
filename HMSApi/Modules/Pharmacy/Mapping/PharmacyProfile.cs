using AutoMapper;
using HMSApi.Modules.Pharmacy.DTOs;
using HMSApi.Modules.Pharmacy.Entities;


namespace HMSApi.Mudoles.Pharmacy.PharmacyMapping;

public class PharmacyProfile : Profile
{
    public PharmacyProfile()
    {
        // Medicine Mappings
        CreateMap<CreateMedicineDto, Medicines>();
        CreateMap<UpdateMedicineDto, Medicines>();
        CreateMap<Medicines, MedicineDto>();

        // MedicineStock Mappings
        CreateMap<CreateMedicineStockDto, MedicineStock>();
        CreateMap<UpdateMedicineStockDto, MedicineStock>();
        CreateMap<MedicineStock, MedicineStockDto>();

        // PharmacySale Mappings
        CreateMap<CreatePharmacySaleDto, PharmacySales>();
        CreateMap<UpdatePharmacySaleDto, PharmacySales>();
        CreateMap<PharmacySales, PharmacySaleDto>();


        // PharmacySaleDetails Mappings
        CreateMap<CreatePharmacySaleDetailsDto, PharmacySalesdetails>();
        CreateMap<UpdatePharmacySaleDetailsDto, PharmacySalesdetails>();
        CreateMap<PharmacySalesdetails, PharmacySaleDetailsDto>();


    }
}