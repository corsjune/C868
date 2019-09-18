using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Interfaces.Services
{
    public interface IOrderService
    {
        IEnumerable<OrderViewModel> GetAll();
        OrderViewModel GetById(int id);
        OrderViewModel Add(OrderViewModel item);
        OrderViewModel Update(int orderID, OrderViewModel item);
        int Delete(int orderID );
    }
}
