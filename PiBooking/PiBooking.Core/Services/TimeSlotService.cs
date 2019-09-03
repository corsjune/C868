using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using AutoMapper;
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
        ITimeSlotRepository _repo;
        IMapper _mapper;

        public TimeSlotService(ITimeSlotRepository repo, IMapper mapper) : base()
        {
            _repo = repo;
            _mapper = mapper;
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
            var data = new List<Timeslot>(_repo.GetAll());

            var returnValue = _mapper.Map<List<Timeslot>, List<TimeSlotViewModel>>(data);
            return returnValue;
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
