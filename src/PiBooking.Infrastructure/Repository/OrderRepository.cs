using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Data;
using System.Linq;
using System.Collections;
using PiBooking.Core.Extensions;

namespace PiBooking.Infrastructure.Repository
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        ITimeSlotRepository _timeslots;

        public OrderRepository(string connectionString, ITimeSlotRepository timeslots) : base(connectionString)
        {
            _timeslots = timeslots;
        }


        public Order Add(Order item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                var data = connection.Query<int>("[dbo].[CreateOrder]",
                    new
                    {
                        JobId = item.JobID,
                        Signature = item.Signature,
                        TimeSlots = item.TimeSlots.AsTvp<TimeSlot>("[dbo].[PurchasedTimeSlots]")
                    },
                    commandType: CommandType.StoredProcedure
                );

                var returnObject = connection.Get<Order>(data);
                returnObject.TimeSlots = (List<TimeSlot>)_timeslots.GetByOrder(returnObject.OrderID);

                return returnObject;
            }
        }

        public int Delete(Order item)
        {
            using (SqlConnection connection = GetConnection())
            {
                var data = connection.Query<int>("[dbo].[DeleteOrder]",
                    new
                    {
                        OrderID = item.OrderID
                    },
                    commandType: CommandType.StoredProcedure
                );
                //TODO: return a proper value
                return 1;
            }
        }

        public IEnumerable<Order> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<Order>();

                //TODo: Expensive, find another way
                foreach (Order order in returnObject)
                {
                    order.TimeSlots = (List<TimeSlot>)_timeslots.GetByOrder(Convert.ToInt32(order.OrderID));
                }
                return returnObject;
            }
        }

        public IEnumerable<Order> GetAll(int customerID)
        {
            var sql = @"SELECT *
              FROM  [dbo].[Order] O
	            inner join [dbo].[Job] J on O.JobID=J.JobID
	            inner join [dbo].[Customer] C on J.CustomerID=C.CustomerID
              Where C.CustomerID = @CustomerID";

            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Query<Order>(sql,
                    new { CustomerID = customerID });

                //TODo: Expensive, find another way
                foreach (Order order in returnObject)
                {
                    order.TimeSlots = (List<TimeSlot>)_timeslots.GetByOrder(Convert.ToInt32(order.OrderID));
                }
                return returnObject;
            }
        }

        public Order GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Order>(id);
                returnObject.TimeSlots = (List<TimeSlot>)_timeslots.GetByOrder(Convert.ToInt32(id));

                return returnObject;
            }
        }

        public Order Update(Order item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<Order>(item.OrderID);
                returnObject.TimeSlots = (List<TimeSlot>)_timeslots.GetByOrder(Convert.ToInt32(returnObject.OrderID));

                return returnObject;
            }
        }
    }
}
