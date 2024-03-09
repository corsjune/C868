using Dapper;
using Dapper.Contrib.Extensions;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace PiBooking.Infrastructure.Repository
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(string connectionString) : base(connectionString)
        {

        }

        public User Add(User item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                var id = connection.Insert(item);

                var returnObject = connection.Get<User>(id);
                return returnObject;
            }
        }

        public int Delete(User item)
        {
            using (SqlConnection connection = GetConnection())
            {
                if (connection.Delete(item))
                    return 1;
                else
                    return 0;
            }


        }

        public IEnumerable<User> GetAll()
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.GetAll<User>();
                return returnObject;
            }
        }

        public User GetById(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.Get<User>(id);
                return returnObject;
            }
        }

        public User GetByUserName(string UserName)
        {
            string sql = "SELECT * FROM [User] WHERE UserName = @UserName;";

            using (SqlConnection connection = GetConnection())
            {
                var returnObject = connection.QueryFirstOrDefault<User>(sql, new { UserName });
                return returnObject;
            }
        }

        public User Update(User item)
        {
            this.SetBaseFields((BaseModel)item);

            using (SqlConnection connection = GetConnection())
            {
                connection.Update(item);

                var returnObject = connection.Get<User>(item.Id);
                return returnObject;
            }
        }
    }
}
