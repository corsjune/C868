using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using PiBooking.Core.AppSettings;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using PiBooking.Core.Repository;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;

namespace PiBooking.Core.Repository
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {

        public OrderRepository(IOptions<AppSettings.AppSettings> settings) : base(settings)
        {

        }


        public void Add(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Insert(item);
            }
        }

        public void Delete(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Delete(item);
            }
        }

        public IEnumerable<Order> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<Order>();
                return returnObject;
            }
        }

        public Order GetById(Guid id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Order>(id);
                return returnObject;
            }
        }

        public void Update(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);
            }
        }
    }
}
