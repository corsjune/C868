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

        public void Add(Timeslot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Insert(item);
            }
        }

        public void Delete(Timeslot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Delete(item);
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

        public Timeslot GetById(Guid id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Timeslot>(id);
                return returnObject;
            }
        }

        public void Update(Timeslot item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);
            }
        }
    }
}
