using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Dapper;
using System.Data.SqlClient;

namespace PiBooking.Core.Repository
{
    public class BaseRepository
    {
        private string _connection;
        public BaseRepository(IOptions<AppSettings.AppSettings> settings)
        {
            _connection = settings.Value.PersistanceConnectionString;
        }
         
   

        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connection);
        }
    }
}
