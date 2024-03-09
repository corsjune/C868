using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IEngineerRepository
    {
        IEnumerable<Engineer> GetAll();
        Engineer GetById(int id);
        Engineer Add(Engineer item);
        Engineer Update(Engineer item);
        int Delete(Engineer item);
    }
}
