using AutoMapper;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;

namespace HMSApi.Modules.Store.FinalMapping;

public class StoreProfile : Profile
{
    public StoreProfile()
    {
        // ================= ITEM =================
        CreateMap<CreateItemDto, Items>();
        CreateMap<UpdateItemDto, Items>();
        CreateMap<Items, ItemDto>();

        // ================= ITEM STOCK =================
        CreateMap<CreateItemStockDto, ItemStock>();
        CreateMap<UpdateItemStockDto, ItemStock>();
        CreateMap<ItemStock, ItemStockDto>()
            .ForCtorParam("ItemName",
                opt => opt.MapFrom(src => src.Item.Name));

        // ================= PURCHASE DETAILS =================
        CreateMap<CreatePurchaseDetailsDto, PurchaseDetail>();

        CreateMap<UpdatePurchaseDetailsDto, PurchaseDetail>();

        CreateMap<PurchaseDetail, PurchaseDetailsDto>()
            .ForCtorParam("ItemName",
                opt => opt.MapFrom(src => src.Item.Name))
            .ForCtorParam("PurchaseName",
                opt => opt.MapFrom(src => src.Purchase.Notes));

        // ================= PURCHASE =================
        CreateMap<CreatePurchaseDto, Purchases>()
            .ForMember(dest => dest.PurchasesDetails,
                opt => opt.MapFrom(src => src.Details));

        CreateMap<UpdatePurchasesDto, Purchases>();

        CreateMap<Purchases, PurchasesDto>()
            .ForMember(dest => dest.SupplierName,
                opt => opt.MapFrom(src => src.Supplier.Name))
            .ForMember(dest => dest.Details,
            opt => opt.MapFrom(src => src.PurchasesDetails));

        // ================= SUPPLIER =================
        CreateMap<CreateSuplierDto, Suppliers>();
        CreateMap<UpdateSuplierDto, Suppliers>();
        CreateMap<Suppliers, SuplierDto>();
    }
}