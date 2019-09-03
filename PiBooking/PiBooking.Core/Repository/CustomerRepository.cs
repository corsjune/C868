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

namespace PiBooking.Core.Repository
{
    public class CustomerRepository :BaseRepository, ICustomerRepository
    {
        public CustomerRepository(IOptions<AppSettings.AppSettings> settings) :base(settings)
        {

        }

        public void Add(CustomerAccount item)
        {
             
            using (SqlConnection connection = GetConnection())
            { 
                connection.Insert(item);
            }
        }

        public void Delete(CustomerAccount item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Delete(item);
            }
        }

        public IEnumerable<CustomerAccount> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<CustomerAccount>();
                return returnObject;
            }
        }

        public CustomerAccount GetById(Guid id)
        { 
            using (SqlConnection connection = GetConnection())
            { 
                var returnObject = connection.Get<CustomerAccount>(id);
                return returnObject;
            }
        }

        public void Update(CustomerAccount item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);
            }
        }
    }
}
