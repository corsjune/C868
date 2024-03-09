using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Dapper;

namespace PiBooking.Infrastructure.Repository
{
    public class JobRepository : BaseRepository, IJobRepository
    {
        public JobRepository(string connectionString) : base(connectionString)
        {

        }

        public Job Add(Job item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                var id = connection.Insert(item);

                var returnObject = connection.Get<Job>(id);
                return returnObject;
            }
        }

        public int Delete(Job item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
            }
        }

        public IEnumerable<Job> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<Job>();
                return returnObject;
            }
        }

        public Job GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Job>(id);
                return returnObject;
            }
        }

        public Job Update(Job item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<Job>(item.JobId);
                return returnObject;
            }
        }


        public Job GetByCustomerAndJobName(int customerID, string jobName)
        {
            string sql = "SELECT * FROM [Job] WHERE JobName = @jobName and CustomerID = @customerID;";

            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.QueryFirstOrDefault<Job>(sql, new { customerID, jobName });
                return returnObject;
            }
        }

    }
}
