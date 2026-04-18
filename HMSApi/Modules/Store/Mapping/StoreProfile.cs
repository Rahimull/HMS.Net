using AutoMapper;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;


namespace HMSApi.Mudoles.Store.FinaMapping;

public class StoreProfile : Profile
{
    public StoreProfile()
    {


        // Item Mappings
        CreateMap<CreateItemDto, Items>();
        CreateMap<UpdateItemDto, Items>();
        CreateMap<Items, ItemDto>();

        // ItemStock Mappings
        CreateMap<CreateItemStockDto, ItemStock>();
        CreateMap<UpdateItemStockDto, ItemStock>();
        CreateMap<ItemStock, ItemStockDto>()
            .ForCtorParam("ItemName", opt => opt.MapFrom(src => src.Item.Name));

        // PurchaseDetails Mappings
        CreateMap<CreatePurchaseDetailsDto, PurchaseDetail>();
        CreateMap<UpdatePurchaseDetailsDto, PurchaseDetail>();
        CreateMap<PurchaseDetail, PurchaseDetailsDto>()
            .ForCtorParam("ItemName", opt => opt.MapFrom(src => src.Item.Name))
            .ForCtorParam("PurchaseName", opt => opt.MapFrom(src => src.Purchase.Notes));

        // Purchases Mappings
        CreateMap<CreatePurchasesDto, Purchases>();
        CreateMap<UpdatePurchasesDto, Purchases>();
        CreateMap<Purchases, PurchasesDto>()
            .ForCtorParam("ItemName", opt => opt.MapFrom(src => src.Item.Name))
            .ForCtorParam("SupplierName", opt => opt.MapFrom(src => src.Supplier.Name));

        // Suplier Mappings
        CreateMap<CreateSuplierDto, Suppliers>();
        CreateMap<UpdateSuplierDto, Suppliers>();
        CreateMap<Suppliers, SuplierDto>();




    }
}