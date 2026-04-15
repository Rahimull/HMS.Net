

using HMSApi.Data;
using HMSApi.Modules.HR.Entities;
using HMSApi.Repositories;

namespace HMSApi.Modules.HR.Repositories;

public class PayrollRepository : BaseRepository<Payrolls>, IPayrollRepository
{
    public PayrollRepository(HMSDBC context) : base(context)
    {
        
    }
}