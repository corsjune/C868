using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;
namespace PiBooking.Core.Interfaces.Services
{
    public interface ICustomerService
    {
        IEnumerable<CustomerAccount> GetAll();
        CustomerAccount GetById(int id);
        CustomerAccount Add(CustomerAccount item);
        CustomerAccount Update(int customerID, CustomerAccount item);
        int Delete(int customerID);
    }
}
