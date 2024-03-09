using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IEngineerService
    {
        IEnumerable<Engineer> GetAll();
        Engineer GetById(int id);
        Engineer Add(Engineer item);
        Engineer Update(int engineerID, Engineer item);
        int Delete(int engineerID);
    }
}
