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
        JobViewModel GetById(Guid id);
        void Add(JobViewModel item);
        void Update(JobViewModel item);
        void Delete(JobViewModel item);
    }
}
