using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;

namespace PiBooking.Infrastructure.Repository
{
    public class EngineerRepository : BaseRepository, IEngineerRepository
    {
        public EngineerRepository(string connectionString) : base(connectionString)
        {

        }

        public Engineer Add(Engineer item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                var id = connection.Insert(item);

                var returnObject = connection.Get<Engineer>(id);
                return returnObject;
            }
        }

        public int Delete(Engineer item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
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

        public Engineer GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<Engineer>(id);
                return returnObject;
            }
        }

        public Engineer Update(Engineer item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<Engineer>(item.EngineerID);
                return returnObject;
            }
        }
    }
}
