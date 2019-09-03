using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IJobRepository
    {
        IEnumerable<Job> GetAll();
        Job GetById(Guid id);
        void Add(Job item);
        void Update(Job item);
        void Delete(Job item);
    }
}
