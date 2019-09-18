using PiBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface ITimeSlotRepository
    {
        IEnumerable<Timeslot> GetAll();
        Timeslot GetById(int id);
        Timeslot Add(Timeslot item);
        Timeslot Update(Timeslot item);
        int Delete(Timeslot item);
    }
}
