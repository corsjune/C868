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
        EngineerViewModel GetById(Guid id);
        void Add(EngineerViewModel item);
        void Update(EngineerViewModel item);
        void Delete(EngineerViewModel item);
    }
}
