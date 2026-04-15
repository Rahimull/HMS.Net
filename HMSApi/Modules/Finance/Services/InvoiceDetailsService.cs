using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Modules.Finance.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Finance.Services;


public class InvoiceDetailsService : BaseService<InvoiceDetails, InvoiceDetailsDto, CreateInvoiceDetailsDto, UpdateInvoiceDetailsDto>, IInvoiceDetailsService
{
    public InvoiceDetailsService(IInvoiceDetailsRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<InvoiceDetails> BuildSpecification(QueryParams query)
    {
        return new InvoiceDetailsSpecification(query);
    }
}