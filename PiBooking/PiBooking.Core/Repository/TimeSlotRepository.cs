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

        public Timeslot Add(Timeslot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                var id = connection.Insert(item);
                var returnObject = connection.Get<Timeslot>(id);
                return returnObject;
            }
        }

        public int Delete(Timeslot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
            }
        }

        public IEnumerable<Timeslot> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<Timeslot>();
                return returnObject;
            }
        }

        public Timeslot GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Timeslot>(id);
                return returnObject;
            }
        }

        public Timeslot Update(Timeslot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<Timeslot>(item.TimeslotID);
                return returnObject;
            }
        }
    }
}
