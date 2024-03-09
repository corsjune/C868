using PiBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Add(User user, string password);
        User Update(int userID, User user, string password = null);
        int Delete(int id);
    }
}
