using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IOrderService
    {
        IEnumerable<Order> GetAll();

        IEnumerable<Order> GetAll(int customerID);

        Order GetById(int id);
        Order Add(Order item);
        Order Update(int orderID, Order item);
        int Delete(int orderID);
    }
}
