using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IEngineerService
    {
        IEnumerable<EngineerViewModel> GetAll();
        EngineerViewModel GetById(int id);
        EngineerViewModel Add(EngineerViewModel item);
        EngineerViewModel Update(int engineerID, EngineerViewModel item);
        int Delete(int engineerID);
    }
}
