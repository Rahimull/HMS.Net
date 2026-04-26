using AutoMapper;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Modules.Store.FinalMapping;

public class StoreProfile : Profile
{
    public StoreProfile()
    {
        // ================= ITEM =================
        CreateMap<CreateItemDto, Item>();
        CreateMap<UpdateItemDto, Item>();

        CreateMap<Item, ItemDto>()
            .ForMember(dest => dest.CategoryName,
                opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.UnitName,
                opt => opt.MapFrom(src => src.Unit.Name));

        // ================= ITEM STOCK =================
        CreateMap<CreateItemStockDto, ItemStock>();
        CreateMap<UpdateItemStockDto, ItemStock>();

        CreateMap<ItemStock, ItemStockDto>()
            .ForMember(dest => dest.ItemName,
                opt => opt.MapFrom(src => src.Item.Name));

        // ================= ITEM STOCK =================
        CreateMap<CreateCurrentStockDto, CurrentStock>();
        CreateMap<UpdateCurrentStockDto, CurrentStock>();

        CreateMap<CurrentStock, CurrentStockDto>()
            .ForMember(dest => dest.ItemName,
                opt => opt.MapFrom(src => src.Item.Name));

        // ================= PURCHASE DETAILS =================
        CreateMap<CreatePurchaseDetailDto, PurchaseDetail>();

        CreateMap<PurchaseDetail, PurchaseDetailsDto>()
            .ForMember(dest => dest.ItemName,
                opt => opt.MapFrom(src => src.Item.Name))
            .ForMember(dest => dest.PurchaseName,
                opt => opt.MapFrom(src => "Purchase #" + src.PurchaseId));

        // ================= PURCHASE =================
        CreateMap<CreatePurchaseDto, Purchases>()
            .ForMember(dest => dest.PurchaseDetails,
                opt => opt.MapFrom(src => src.Details));

        CreateMap<UpdatePurchasesDto, Purchases>();

        CreateMap<Purchases, PurchasesDto>()
            .ForMember(dest => dest.SupplierName,
                opt => opt.MapFrom(src => src.Supplier.Name))
            .ForMember(dest => dest.Details,
                opt => opt.MapFrom(src => src.PurchaseDetails));

        // ================= SUPPLIER =================
        CreateMap<CreateSuplierDto, Suppliers>();
        CreateMap<UpdateSuplierDto, Suppliers>();
        CreateMap<Suppliers, SuplierDto>();

        
    }
}