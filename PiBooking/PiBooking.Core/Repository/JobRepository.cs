using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;

namespace PiBooking.Core.Repository
{
    public class JobRepository : BaseRepository,  IJobRepository
    {
        public JobRepository(IOptions<AppSettings.AppSettings> settings) : base(settings)
        {

        }

        public Job Add(Job item)
        {
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
    }
}
