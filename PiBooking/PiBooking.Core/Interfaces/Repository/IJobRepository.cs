using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IJobRepository
    {
        IEnumerable<Job> GetAll();
        Job GetById(int id);

        Job GetByCustomerAndJobName(int customerID, string jobName);

        Job Add(Job item);
        Job Update(Job item);
        int Delete(Job item);
    }
}
