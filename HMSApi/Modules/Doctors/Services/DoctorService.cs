using AutoMapper;
using HMSApi.Modules.Doctors.DTOs;
using HMSApi.Modules.Doctors.Entities;
using HMSApi.Modules.Doctors.Repositories;

namespace HMSApi.Modules.Doctors.Services;


public class DoctorService : BaseService<Doctor, DoctorDto, CreateDoctorDto, UpdateDoctorDto>, IDoctorService
{
    public DoctorService(IDoctorRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}