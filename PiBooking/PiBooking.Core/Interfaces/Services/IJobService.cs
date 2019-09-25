using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IJobService
    {
        IEnumerable<Job> GetAll();
        Job GetById(int id);
        Job Add(Job item);
        Job Update(int jobID, Job item);
        int Delete(int jobID);
    }
}
