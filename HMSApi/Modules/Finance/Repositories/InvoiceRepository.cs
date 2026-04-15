using HMSApi.Data;
using HMSApi.Modules.Finance.Entities;
using HMSApi.Repositories;


namespace HMSApi.Modules.Finance.Repositories;

public class InvoiceRepository : BaseRepository<Invoice>, IInvoiceRepository
{
    public InvoiceRepository(HMSDBC context) : base(context)
    {
        
    }
}