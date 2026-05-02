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
                opt => opt.MapFrom(src => src.Item.Name))
            .ForMember(d => d.IsExpired, opt => opt.MapFrom(s => s.ExpiryDate.HasValue && s.ExpiryDate < DateOnly.FromDateTime(DateTime.UtcNow)));

        // ================= ITEM CURRENT STOCK =================
        CreateMap<CreateCurrentStockDto, CurrentStock>();
        CreateMap<UpdateCurrentStockDto, CurrentStock>();

        CreateMap<CurrentStock, CurrentStockDto>()
            .ForMember(dest => dest.ItemName,
                opt => opt.MapFrom(src => src.Item.Name));

        // ================= PURCHASE DETAILS =================
        CreateMap<CreatePurchaseDetailDto, PurchaseDetail>();

        CreateMap<PurchaseDetail, PurchaseDetailDto>()
    .ForMember(d => d.ItemName, opt => opt.MapFrom(s => s.Item.Name))
    .ForMember(d => d.SubTotal, opt => opt.MapFrom(s => s.Quantity * s.UnitPrice));

        // ================= PURCHASE =================
        CreateMap<CreatePurchaseDto, Purchases>()
            .ForMember(dest => dest.PurchaseDetails,
                opt => opt.MapFrom(src => src.Details));

        CreateMap<UpdatePurchaseDto, Purchases>();

        CreateMap<Purchases, PurchasesDto>()
    .ForMember(d => d.SupplierName, opt => opt.MapFrom(s => s.Supplier.Name))
    .ForMember(d => d.Details, opt => opt.MapFrom(s => s.PurchaseDetails));

        // ================= SUPPLIER =================
        CreateMap<CreateSuplierDto, Suppliers>();
        CreateMap<UpdateSuplierDto, Suppliers>();
        CreateMap<Suppliers, SuplierDto>();


    }
}