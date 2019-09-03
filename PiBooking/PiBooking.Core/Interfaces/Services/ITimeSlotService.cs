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
        TimeSlotViewModel GetById(Guid id);
        void Add(TimeSlotViewModel item);
        void Update(TimeSlotViewModel item);
        void Delete(TimeSlotViewModel item);
    }
}
