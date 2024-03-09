using PiBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.Interfaces.Services
{
    public interface ITimeSlotService
    {
        IEnumerable<TimeSlot> GetAll();
        IEnumerable<TimeSlot> GetAllAvailableByEngineerAndDateRange(int engineerID, DateTime startDateRange, DateTime endDateRange);
        TimeSlot GetById(int id);
        TimeSlot Add(TimeSlot item);
        TimeSlot Update(int timeSlotID, TimeSlot item);
        int Delete(int timeSlotID);
    }
}
