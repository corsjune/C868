using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.Core.Repository
{
    public class TimeSlotService : BaseService, ITimeSlotService
    {
        public TimeSlotService(ITimeSlotRepository repo) : base()
        {

        }

        public void Add(TimeSlotViewModel item)
        {
            throw new NotImplementedException();
        }

        public void Delete(TimeSlotViewModel item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TimeSlotViewModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public TimeSlotViewModel GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Update(TimeSlotViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}
