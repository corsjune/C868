using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.Interfaces.Services
{
    public interface ITimeSlotService
    {
        IEnumerable<TimeSlotViewModel> GetAll();
        TimeSlotViewModel GetById(int id);
        TimeSlotViewModel Add(TimeSlotViewModel item);
        TimeSlotViewModel Update(int timeSlotID, TimeSlotViewModel item);
        int Delete(int timeSlotID);
    }
}
