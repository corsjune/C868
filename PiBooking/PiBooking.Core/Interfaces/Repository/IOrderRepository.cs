using System;
using System.Collections.Generic;
using System.Text;
using PiBooking.Core.Models;

namespace PiBooking.Core.Interfaces.Repository
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAll();
        Order GetById(Guid id);
        void Add(Order item);
        void Update(Order item);
        void Delete(Order item);
    }
}
