using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Infrastructure.Repository;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;
using PiBooking.Core.Interfaces.Repository;

namespace PiBooking.Application.Services
{
    public class OrderService : BaseService, IOrderService
    {
        IOrderRepository _repo;


        public OrderService(IOrderRepository repo) : base()
        {
            _repo = repo;
        }

        public Order Add(Order item)
        {
            return _repo.Add(item);
        }

        public int Delete(int orderID)
        {
            var data = _repo.GetById(orderID);
            return _repo.Delete(data);
        }

        public IEnumerable<Order> GetAll()
        {
            return _repo.GetAll();
        }

        public IEnumerable<Order> GetAll(int customerID)
        {
            return _repo.GetAll(customerID);
        }

        public Order GetById(int id)
        {
            return _repo.GetById(id);
        }

        public Order Update(int orderID, Order item)
        {
            var data = _repo.GetById(orderID);

            data.Total = item.Total;
            data.HasPaid = item.HasPaid;

            return _repo.Update(data);
        }
    }
}
