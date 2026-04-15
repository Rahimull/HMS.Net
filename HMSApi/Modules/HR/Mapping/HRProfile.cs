using AutoMapper;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Entities;


namespace HMSApi.Mudoles.HR.HRMapping;

public class HRProfile : Profile
{
    public HRProfile()
    {
        // Employees Mappings
        CreateMap<EmployeeDto, Employees>();
        CreateMap<UpdateEmployeeDto, Employees>();
        CreateMap<Employees, EmployeeDto>();

        // Employees Mappings
        CreateMap<PayrollDto, Payrolls>();
        CreateMap<UpdatePayrollDto, Payrolls>();
        CreateMap<Payrolls, PayrollDto>();

        

        // Shift Mappings
        CreateMap<CreateShiftDto, Shift>();
        CreateMap<UpdateShiftDto, Shift>();
        CreateMap<Shift, ShiftDto>();

    }
}