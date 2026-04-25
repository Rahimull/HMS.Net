using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Common.DTOs;
using HMSApi.Modules.Common.Entities;
using HMSApi.Modules.Common.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Common.Services;


public class UnitService : BaseService<Unit, UnitDto, CreateUnitDto, UpdateUnitDto>, IUnitService
{
    public UnitService(IUnitRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Unit> BuildSpecification(QueryParams query)
    {
        return new UnitSpecification(query);
    }
}