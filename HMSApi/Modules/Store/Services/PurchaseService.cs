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

            PurchasesDetails = dto.Details?.Select(d => new PurchaseDetail
            {
                ItemId = d.ItemId,
                Quantity = d.Quantity,
                UnitPrice = d.UnitPrice,
                SubTotal = d.Quantity * d.UnitPrice,
                BatchNumber = d.BatchNumber,
                ExpiryDate = d.ExpiryDate
            }).ToList() ?? new List<PurchaseDetail>()
        };

        entity.TotalPrice = entity.PurchasesDetails.Sum(x => x.SubTotal);

        await _repo.AddAsync(entity);

        var created = await _repo.Query()
            .Where(x => x.Id == entity.Id)
            .Include(x => x.Supplier)
            .Include(x => x.PurchasesDetails)
                .ThenInclude(d => d.Item)
            .FirstOrDefaultAsync();

        if (created == null)
            throw new Exception("Purchase creation failed");

        return _mapper.Map<PurchasesDto>(created);
    }
}