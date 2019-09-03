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

namespace PiBooking.Core.Repository
{
    public class CustomerService : BaseService, ICustomerService
    {
        public CustomerService(ICustomerRepository repo) :base()
        {

        }

        public void Add(CustomerViewModel item)
        {
            throw new NotImplementedException();
        }

        public void Delete(CustomerViewModel item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CustomerViewModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public CustomerViewModel GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Update(CustomerViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}
