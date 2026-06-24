

using HMSApi.Data;
using HMSApi.Modules.Pharmacy.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Pharmacy.Repositories;

public class SalePaymentRepository : BaseRepository<SalePayment>, ISalePaymentRepository
{
    public SalePaymentRepository(HMSDBC context) : base(context)
    {
        
    }
}