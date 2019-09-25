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
        }
    }
}
