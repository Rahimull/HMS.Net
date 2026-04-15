

using HMSApi.Data;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Finance.Repositories;

public class PaymentRepository : BaseRepository<Payment>, IPaymentRepository
{
    public PaymentRepository(HMSDBC context) : base(context)
    {
        
    }
}