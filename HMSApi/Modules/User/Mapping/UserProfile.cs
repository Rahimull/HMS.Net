using AutoMapper;
using HMSApi.Modules.User.Entities;
using HMSApi.Modules.User.DTOs;

namespace HMSApi.Modules.User.UserMapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        // =========================
        // CREATE USER
        // =========================
        CreateMap<CreateUserDto, AppUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
            .ForMember(dest => dest.DepartmentId, opt => opt.MapFrom(src => src.DepartmentId))

            // Identity-managed fields (must not be mapped)
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.IsActive, opt => opt.Ignore())
            .ForMember(dest => dest.LastLoginAt, opt => opt.Ignore())
            .ForMember(dest => dest.ProfileImage, opt => opt.Ignore());

        // =========================
        // UPDATE USER
        // =========================
        CreateMap<UpdateUserDto, AppUser>()
            .ForMember(dest => dest.UserName, opt => opt.Ignore()) // username should not change
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
            .ForMember(dest => dest.DepartmentId, opt => opt.MapFrom(src => src.DepartmentId))
            .ForMember(dest => dest.ProfileImage, opt => opt.MapFrom(src => src.ProfileImage))

            // system fields
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.LastLoginAt, opt => opt.Ignore())
            .ForMember(dest => dest.IsActive, opt => opt.Ignore());

        // =========================
        // ENTITY → LIST DTO
        // =========================
        CreateMap<AppUser, UserListDto>()
    .ForMember(dest => dest.DepartmentName,
        opt => opt.MapFrom(src =>
            src.Department != null ? src.Department.Name : null));

        CreateMap<AppUser, DetailsUserDto>();
    }
}