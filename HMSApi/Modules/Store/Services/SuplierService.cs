using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Store.DTOs;
using HMSApi.Modules.Store.Entities;
using HMSApi.Modules.Store.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Store.Services;
using HMSApi.Specifications;


public class SuplierService : BaseService<Suppliers, SuplierDto, CreateSuplierDto, UpdateSuplierDto>, ISuplierService
{
    public SuplierService(ISuplierRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Suppliers> BuildSpecification(QueryParams query)
    {
        return new SuplierSpecification(query);
    }
}