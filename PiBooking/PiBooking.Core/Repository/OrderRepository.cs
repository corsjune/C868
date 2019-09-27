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
using Dapper;
using System.Data;
using System.Linq;
using System.Collections;
using PiBooking.Core.Extensions;

namespace PiBooking.Core.Repository
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        ITimeSlotRepository _timeslots;

        public OrderRepository(IOptions<AppSettings.AppSettings> settings, ITimeSlotRepository timeslots) : base(settings)
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
                ); ; 

                var returnObject = connection.Get<Order>(data);
                returnObject.TimeSlots =(List<TimeSlot>) _timeslots.GetByOrder(returnObject.OrderID);

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
                return returnObject;
            }
        }
    }
}
