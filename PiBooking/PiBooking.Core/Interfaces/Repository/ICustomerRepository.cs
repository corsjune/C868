using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface ICustomerRepository
    {
        IEnumerable<CustomerAccount> GetAll();
        CustomerAccount GetById(Guid id);
        void Add(CustomerAccount item);
        void Update(CustomerAccount item);
        void Delete(CustomerAccount item);
    }
}
