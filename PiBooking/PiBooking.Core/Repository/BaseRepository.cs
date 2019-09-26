using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Dapper;
using System.Data.SqlClient;
using PiBooking.Core.Models;

namespace PiBooking.Core.Repository
{
    public class BaseRepository
    {
        private string _connection;
        public BaseRepository(IOptions<AppSettings.AppSettings> settings)
        {
            _connection = settings.Value.PersistanceConnectionString;
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
