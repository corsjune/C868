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

        public CustomerAccount Add(CustomerAccount item)
        {
             
            using (SqlConnection connection = GetConnection())
            { 
                var id = connection.Insert(item);

                var returnObject = connection.Get<CustomerAccount>(id);
                return returnObject;
            }
        }

        public int Delete(CustomerAccount item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
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

        public CustomerAccount GetById(int id)
        { 
            using (SqlConnection connection = GetConnection())
            { 
                var returnObject = connection.Get<CustomerAccount>(id);
                return returnObject;
            }
        }

        public CustomerAccount Update(CustomerAccount item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<CustomerAccount>(item.CustomerAccountId);
                return returnObject;
            }
        }
    }
}
