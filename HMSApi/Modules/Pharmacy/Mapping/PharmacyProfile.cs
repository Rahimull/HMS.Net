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
        CreateMap<MedicineStock, MedicineStockDto>()
            .ForCtorParam("MedicineName", opt => opt.MapFrom(src => src.Medicine.Name));

        // PharmacySale Mappings
        CreateMap<CreatePharmacySaleDto, PharmacySales>();
        CreateMap<UpdatePharmacySaleDto, PharmacySales>();
        CreateMap<PharmacySales, PharmacySaleDto>()
        .ForCtorParam("PatientName", opt => opt.MapFrom(src => src.Patient.FirstName + " " + src.Patient.LastName))
        .ForCtorParam("DoctorName", opt => opt.MapFrom(src => src.Doctor.FirstName + " " + src.Doctor.LastName))
        .ForCtorParam("PrescriptionName", opt => opt.MapFrom(src => src.Prescription.Patient.FirstName))
        ;



        // PharmacySaleDetails Mappings
        CreateMap<CreatePharmacySaleDetailsDto, PharmacySalesdetails>();
        CreateMap<UpdatePharmacySaleDetailsDto, PharmacySalesdetails>();
        CreateMap<PharmacySalesdetails, PharmacySaleDetailsDto>()
            .ForCtorParam("PharmacySaleName", opt => opt.MapFrom(src => src.PharmacySale.Patient.FirstName + " " + src.PharmacySale.Patient.LastName))
            .ForCtorParam("MedicineName", opt => opt.MapFrom(src => src.Medicine.Name));


    }
}