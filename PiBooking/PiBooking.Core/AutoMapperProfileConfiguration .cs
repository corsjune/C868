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
            CreateMap< TimeSlotViewModel, TimeSlot>();

            CreateMap<EngineerViewModel, Engineer>();
            CreateMap<Engineer, EngineerViewModel>();

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
