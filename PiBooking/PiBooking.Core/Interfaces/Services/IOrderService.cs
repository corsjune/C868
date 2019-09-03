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
        OrderViewModel GetById(Guid id);
        void Add(OrderViewModel item);
        void Update(OrderViewModel item);
        void Delete(OrderViewModel item);
    }
}
