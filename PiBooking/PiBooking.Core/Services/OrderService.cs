using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using PiBooking.Core.AppSettings;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.Repository;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;
using PiBooking.Core.ViewModels;
using PiBooking.Core.Interfaces.Repository;

namespace PiBooking.Core.Services
{
    public class OrderService : BaseService, IOrderService
    {

        public OrderService(IOrderRepository repo) : base()
        {

        }

        public Order Add(Order item)
        {
            throw new NotImplementedException();
        }

        public int Delete(int orderID)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> GetAll()
        {
            throw new NotImplementedException();
        }

        public Order GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Order Update(int orderID, Order item)
        {
            throw new NotImplementedException();
        }
    }
}
