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

        public void Add(Job item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Insert(item);
            }
        }

        public void Delete(Job item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Delete(item);
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

        public Job GetById(Guid id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Job>(id);
                return returnObject;
            }
        }

        public void Update(Job item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);
            }
        }
    }
}
