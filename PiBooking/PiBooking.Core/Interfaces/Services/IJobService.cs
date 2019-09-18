using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IJobService
    {
        IEnumerable<JobViewModel> GetAll();
        JobViewModel GetById(int id);
        JobViewModel Add(JobViewModel item);
        JobViewModel Update(int jobID, JobViewModel item);
        int Delete(int jobID);
    }
}
