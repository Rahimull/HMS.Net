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
        .ForMember(dest => dest.CategoryName, opt=> opt.MapFrom(src => src.Category.Name))
        .ForMember(dest => dest.UnitName, opt=> opt.MapFrom(src => src.Unit.Name));

        // ================= ITEM STOCK =================
        CreateMap<CreateItemStockDto, ItemStock>();
        CreateMap<UpdateItemStockDto, ItemStock>();
        CreateMap<ItemStock, ItemStockDto>()
            .ForCtorParam("ItemName",
                opt => opt.MapFrom(src => src.Item.Name));

        // ================= PURCHASE DETAILS =================
        CreateMap<CreatePurchaseDetailDto, PurchaseDetail>();

        CreateMap<UpdatePurchaseDetailsDto, PurchaseDetail>();

        CreateMap<PurchaseDetail, PurchaseDetailsDto>()
            .ForCtorParam("ItemName",
                opt => opt.MapFrom(src => src.Item.Name))
            .ForCtorParam("PurchaseName",
                opt => opt.MapFrom(src => src.Purchase.Id));

        // ================= PURCHASE =================
        CreateMap<CreatePurchaseDto, Purchases>()
            .ForMember(dest => dest.PurchaseDetails,
                opt => opt.MapFrom(src => src.Items));

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