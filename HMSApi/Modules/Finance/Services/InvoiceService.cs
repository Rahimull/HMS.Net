using AutoMapper;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Repositories;
using HMSApi.Services;
using HMSApi.Models;
using HMSApi.Specifications;
namespace HMSApi.Modules.Finance.Services;


public class InvoiceService : BaseService<Invoice, InvoiceDto, CreateInvoiceDto, UpdateInvoiceDto>, IInvoiceService
{
    public InvoiceService(IInvoiceRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }


    

  // 🔥 VERY IMPORTANT
    protected override ISpecification<Invoice> BuildSpecification(QueryParams query)
    {
        return new InvoiceSpecification(query);
    }


}