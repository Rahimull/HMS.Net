using AutoMapper;
using HMSApi.Modules.HR.DTOs;
using HMSApi.Modules.HR.Entities;


namespace HMSApi.Mudoles.HR.HRMapping;

public class HRProfile : Profile
{
    public HRProfile()
    {
        // Employees Mappings
        CreateMap<CreateEmployeeDto, Employees>();
        CreateMap<UpdateEmployeeDto, Employees>();
        CreateMap<Employees, EmployeeDto>()
            .ForCtorParam("DepartmentName", opt => opt.MapFrom(src => src.Department.Name));

        // Employees Mappings
        CreateMap<CreatePayrollDto, Payrolls>();
        CreateMap<UpdatePayrollDto, Payrolls>();
        CreateMap<Payrolls, PayrollDto>()
            .ForCtorParam("EmployeeName", opt => opt.MapFrom(src => src.Employee.Name));

        

        // Shift Mappings
        CreateMap<CreateShiftDto, Shift>();
        CreateMap<UpdateShiftDto, Shift>();
        CreateMap<Shift, ShiftDto>()
            .ForCtorParam("EmployeeName", opt => opt.MapFrom(src => src.Employee.Name));

    }
}