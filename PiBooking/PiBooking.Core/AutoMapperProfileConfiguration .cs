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
            CreateMap<Timeslot, TimeSlotViewModel>();
            CreateMap< TimeSlotViewModel, Timeslot>();
        }
    }
}
