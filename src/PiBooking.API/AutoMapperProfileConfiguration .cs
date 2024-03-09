using AutoMapper;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;
using System;

namespace PiBooking.Core
{
    public class AutoMapperProfileConfiguration : Profile
    {
        public AutoMapperProfileConfiguration()
        : this("MyProfile")
        {
        }
        protected AutoMapperProfileConfiguration(string profileName)
        : base(profileName)
        {
            CreateMap<TimeSlot, TimeSlotViewModel>();
            CreateMap<TimeSlotViewModel, TimeSlot>();

            CreateMap<EngineerViewModel, Engineer>()
                .ForMember(dest => dest.WorkDayBeginTime, opt => opt.MapFrom(src =>
                src.WorkDayBeginTime.ToString("HH:mm")))
                .ForMember(dest => dest.WorkDayEndTime, opt => opt.MapFrom(src => src.WorkDayEndTime.ToString("HH:mm")));

            CreateMap<Engineer, EngineerViewModel>()
                .ForMember(dest => dest.WorkDayBeginTime, opt => opt.MapFrom(src => TimeOnly.Parse(src.WorkDayBeginTime.ToString())))
                .ForMember(dest => dest.WorkDayEndTime, opt => opt.MapFrom(src => TimeOnly.Parse(src.WorkDayEndTime.ToString())));

            CreateMap<UserViewModel, User>();
            CreateMap<User, UserViewModel>();

            CreateMap<OrderViewModel, Order>();
            CreateMap<Order, OrderViewModel>();


            CreateMap<JobViewModel, Job>();
            CreateMap<Job, JobViewModel>();


            CreateMap<CustomerViewModel, CustomerAccount>()
                  .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerAccountId));

            CreateMap<CustomerAccount, CustomerViewModel>()
                  .ForMember(dest => dest.CustomerAccountId, opt => opt.MapFrom(src => src.CustomerId));
        }
    }
}
