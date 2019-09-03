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

namespace PiBooking.Core.Repository
{
    public class OrderService : BaseService, IOrderService
    {

        public OrderService(IOrderRepository repo) : base()
        {

        }

        public void Add(OrderViewModel item)
        {
            throw new NotImplementedException();
        }

        public void Delete(OrderViewModel item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<OrderViewModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public OrderViewModel GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Update(OrderViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}
