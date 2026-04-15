using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Entities;
using HMSApi.Modules.HR.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.HR.Services;


public class ShiftService : BaseService<Shift, ShiftDto, CreateShiftDto, UpdateShiftDto>, IShiftService
{
    public ShiftService(IShiftRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Shift> BuildSpecification(QueryParams query)
    {
        return new ShiftSpecification(query);
    }
}