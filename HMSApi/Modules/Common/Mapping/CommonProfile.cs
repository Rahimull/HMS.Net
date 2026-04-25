using AutoMapper;
using HMSApi.Modules.Common.DTOs;
using HMSApi.Modules.Common.Entities;

namespace HMSApi.Modules.Common.FinalMapping;

public class CommonProfile : Profile
{
    public CommonProfile()
    {
        // ================= ITEM =================
        CreateMap<CreateUnitDto, Unit>();
        CreateMap<UpdateUnitDto, Unit>();
        CreateMap<Unit, UnitDto>();
   

        // ================= ITEM STOCK =================
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();
        CreateMap<Category, CategoryDto>();
            

    }
}