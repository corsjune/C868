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


        public Order Add(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                var id = connection.Insert(item);

                var returnObject = connection.Get<Order>(id);
                return returnObject;
            }
        }

        public int Delete(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
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

        public Order GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Order>(id);
                return returnObject;
            }
        }

        public Order Update(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<Order>(item.OrderID);
                return returnObject;
            }
        }
    }
}
