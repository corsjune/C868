using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User GetById(int id);

        User GetByUserName(string UserName);

        User Add(User item);
        User Update(User item);
        int Delete(User item);
    }
}
