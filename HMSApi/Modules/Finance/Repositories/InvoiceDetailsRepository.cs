

using HMSApi.Data;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.Finance.Repositories;

public class InvoiceDetailRepository : BaseRepository<InvoiceDetails>, IInvoiceDetailsRepository
{
    public InvoiceDetailRepository(HMSDBC context) : base(context)
    {
        
    }
}