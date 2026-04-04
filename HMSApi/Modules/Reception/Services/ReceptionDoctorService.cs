using AutoMapper;
using HMSApi.Models;
using HMSApi.Mudoles.Reception.DTOs;
using HMSApi.Mudoles.Reception.Entities;
using HMSApi.Mudoles.Reception.Repositories;

namespace HMSApi.Mudoles.Reception.Services;


public class ReceptionDoctorService : BaseService<ReceptionDoctor, ReceptionDoctorDto, CreateReceptionDoctorDto, UpdateReceptionDoctorDto>, IReceptionDoctorService
{
    public ReceptionDoctorService(IReceptionDoctorRepository repo, IMapper mapper) : base(repo, mapper)
    {
        
    }
}