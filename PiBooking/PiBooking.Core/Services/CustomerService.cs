using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Services
{
    public class CustomerService : BaseService, ICustomerService
    {
        public CustomerService(ICustomerRepository repo) :base()
        {

        }

        public CustomerAccount Add(CustomerAccount item)
        {
            throw new NotImplementedException();
        }

        public int Delete(int customerID)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CustomerAccount> GetAll()
        {
            throw new NotImplementedException();
        }

        public CustomerAccount GetById(int id)
        {
            throw new NotImplementedException();
        }

        public CustomerAccount Update(int customerID, CustomerAccount item)
        {
            throw new NotImplementedException();
        }
    }
}
