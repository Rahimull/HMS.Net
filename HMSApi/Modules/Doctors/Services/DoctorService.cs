using AutoMapper;
using HMSApi.Models;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;
using HMSApi.Services;
using HMSApi.Specifications;
namespace HMSApi.Modules.Doctors.Services;


public class DoctorService : BaseService<Doctor, DoctorDto, CreateDoctorDto, UpdateDoctorDto>, IDoctorService
{
    public DoctorService(IDoctorRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }

    protected override ISpecification<Doctor> BuildSpecification(QueryParams query)
    {
        return new DoctorSpecification(query);
    }
}