using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Interfaces.Services
{
    public interface ICustomerService
    {
        IEnumerable<CustomerViewModel> GetAll();
        CustomerViewModel GetById(Guid id);
        void Add(CustomerViewModel item);
        void Update(CustomerViewModel item);
        void Delete(CustomerViewModel item);
    }
}
