using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAll(int customerID);
        IEnumerable<Order> GetAll();
        Order GetById(int id);
        Order Add(Order item);
        Order Update(Order item);
        int Delete(Order item);
    }
}
