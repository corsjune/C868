using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Text;
using Dapper;
using Dapper.Contrib.Extensions;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;

namespace PiBooking.Infrastructure.Repository
{
    public class TimeSlotRepository : BaseRepository, ITimeSlotRepository
    {
        public TimeSlotRepository(string connectionString) : base(connectionString)
        {

        }

        public TimeSlot Add(TimeSlot item)
        {
            this.SetBaseFields((BaseModel)item);

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

        public IEnumerable<TimeSlot> GetAllAvailableByEngineerAndDateRange(int engineerID, DateTime startDateRange, DateTime endDateRange)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Query<TimeSlot>("dbo.getAvailableTimeSlotsForEngineer", new { engineerID, startDateRange, endDateRange },
            commandType: CommandType.StoredProcedure);

                return returnObject;
            }
        }

        public IEnumerable<TimeSlot> GetAll()
        {
            var sql = @"  SELECT *
                FROM [dbo].[Timeslot]
                Where Status <> (Select TimeSlotStatusID from dbo.TimeSlotStatus where TimeSlotName='Purchased')";

            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Query<TimeSlot>(sql);
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

        public IEnumerable<TimeSlot> GetByOrder(int OrderId)
        {
            string sql = @"SELECT *
                          FROM  [dbo].[Timeslot]
                          Where OrderID = @OrderID";

            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Query<TimeSlot>(sql, new { OrderId });
                return returnObject;
            }

        }

        public TimeSlot Update(TimeSlot item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<TimeSlot>(item.TimeslotID);
                return returnObject;
            }
        }
    }
}
