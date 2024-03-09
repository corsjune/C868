 
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using PiBooking.Core.Models;

namespace PiBooking.Infrastructure.Repository
{
    public class BaseRepository
    {
        private string _connection;
        public BaseRepository(string connectionString)
        {
            _connection = connectionString;
        }

        public void SetBaseFields(BaseModel value)
        {
            if (!value.CreateDate.HasValue)
                value.CreateDate = DateTime.UtcNow;

            value.UpdateDate = DateTime.UtcNow;
        }


        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connection);
        }
    }
}
