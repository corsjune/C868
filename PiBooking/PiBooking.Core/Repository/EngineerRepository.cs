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
    public class EngineerRepository : BaseRepository, IEngineerRepository
    {
        public EngineerRepository(IOptions<AppSettings.AppSettings> settings) : base(settings)
        {

        }

        public void Add(Engineer item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Insert(item);
            }
        }

        public void Delete(Engineer item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Delete(item);
            }
        }

        public IEnumerable<Engineer> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<Engineer>();
                return returnObject;
            }
        }

        public Engineer GetById(Guid id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Engineer>(id);
                return returnObject;
            }
        }

        public void Update(Engineer item)
        {
            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);
            }
        }
    }
}
