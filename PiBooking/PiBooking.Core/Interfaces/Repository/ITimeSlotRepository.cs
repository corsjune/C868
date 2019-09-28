using PiBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface ITimeSlotRepository
    {
        IEnumerable<TimeSlot> GetAll();
        IEnumerable<TimeSlot> GetByOrder(int OrderId);
        IEnumerable<TimeSlot> GetAllAvailableByEngineerAndDateRange (int engineerID, DateTime startDateRange, DateTime endDateRange);
        TimeSlot GetById(int id);
        TimeSlot Add(TimeSlot item);
        TimeSlot Update(TimeSlot item);
        int Delete(TimeSlot item);
    }
}
