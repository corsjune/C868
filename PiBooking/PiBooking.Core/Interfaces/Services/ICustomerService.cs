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
        CustomerViewModel GetById(int id);
        CustomerViewModel Add(CustomerViewModel item);
        CustomerViewModel Update(int customerID , CustomerViewModel item);
        int Delete(int customerID);
    }
}
