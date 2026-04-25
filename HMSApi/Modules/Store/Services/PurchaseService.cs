using AutoMapper;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
using Microsoft.EntityFrameworkCore;
namespace HMSApi.Modules.Store.Services;


public class PurchaseService : BaseService<Purchases, PurchasesDto, CreatePurchaseDto, UpdatePurchasesDto>, IPurchaseService
{
    public PurchaseService(IPurchaseRepository repo, IMapper mapper) : base(repo, mapper)
    {

    }




    // 🔥 VERY IMPORTANT
    protected override ISpecification<Purchases> BuildSpecification(QueryParams query)
    {
        return new PurchaseSpecification(query);
    }

    public override async Task<PurchasesDto> AddAsync(CreatePurchaseDto dto)
{
    var entity = new Purchases
    {
        SupplierId = dto.SupplierId,
        Notes = dto.Notes,
        PurchaseDate = dto.PurchaseDate,

        PurchaseDetails = dto.Items.Select(d => new PurchaseDetail
        {
            ItemId = d.ItemId,
            Quantity = d.Quantity,
            UnitPrice = d.UnitPrice,
            BatchNumber = d.BatchNumber,
            ExpiryDate = d.ExpiryDate,
        }).ToList()
    };

    entity.TotalPrice = entity.PurchaseDetails.Sum(x => x.Quantity * x.UnitPrice);

    await _repo.AddAsync(entity);

    var created = await _repo.Query()
        .Include(x => x.Supplier)
        .Include(x => x.PurchaseDetails)
            .ThenInclude(d => d.Item)
        .FirstOrDefaultAsync(x => x.Id == entity.Id);

    if (created == null)
        throw new Exception("Purchase creation failed");

    return _mapper.Map<PurchasesDto>(created);
}
    
    }