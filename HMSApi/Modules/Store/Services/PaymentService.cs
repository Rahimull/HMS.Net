using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Finance.DTOs;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Modules.Finance.Repositories;
using HMSApi.Services;
namespace HMSApi.Modules.Finance.Services;
using HMSApi.Specifications;


public class PaymentService : BaseService<Payment, PaymentDto, CreatePaymentDto, UpdatePaymentDto>, IPaymentService
{
    public PaymentService(IPaymentRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Payment> BuildSpecification(QueryParams query)
    {
        return new PaymentSpecification(query);
    }
}