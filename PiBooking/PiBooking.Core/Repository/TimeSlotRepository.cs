using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;

namespace PiBooking.Core.Repository
{
    public class TimeSlotRepository : BaseRepository, ITimeSlotRepository
    {
        public TimeSlotRepository(IOptions<AppSettings.AppSettings> settings) : base(settings)
        {

        }

        public TimeSlot Add(TimeSlot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                var id = connection.Insert(item);
                var returnObject = connection.Get<TimeSlot>(id);
                return returnObject;
            }
        }

        public int Delete(TimeSlot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
            }
        }

        public IEnumerable<TimeSlot> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<TimeSlot>();
                return returnObject;
            }
        }

        public TimeSlot GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<TimeSlot>(id);
                return returnObject;
            }
        }

        public TimeSlot Update(TimeSlot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<TimeSlot>(item.TimeslotID);
                return returnObject;
            }
        }
    }
}
