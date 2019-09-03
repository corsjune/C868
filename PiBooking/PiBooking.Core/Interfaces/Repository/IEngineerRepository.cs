using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IEngineerRepository
    {
        IEnumerable<Engineer> GetAll();
        Engineer GetById(Guid id);
        void Add(Engineer item);
        void Update(Engineer item);
        void Delete(Engineer item);
    }
}
