using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface ICustomerRepository
    {
        IEnumerable<CustomerAccount> GetAll();
        CustomerAccount GetById(int id);
        CustomerAccount Add(CustomerAccount item);
        CustomerAccount Update(CustomerAccount item);
        int Delete(CustomerAccount item);
    }
}
