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

        public TimeSlotViewModel Add(TimeSlotViewModel item)
        { 
            var before = _mapper.Map<TimeSlotViewModel, Timeslot> (item);

            var after = _repo.Add(before);

            return _mapper.Map<Timeslot, TimeSlotViewModel>(after);
        }

        public int Delete(int id)
        {
            var data = _repo.GetById(id);
            return _repo.Delete(data);
        }

        public IEnumerable<TimeSlotViewModel> GetAll()
        {
            var data = new List<Timeslot>(_repo.GetAll());

            var returnValue = _mapper.Map<List<Timeslot>, List<TimeSlotViewModel>>(data);
            return returnValue;
        }

        public TimeSlotViewModel GetById(int id)
        {
            var data = _repo.GetById(id);

            var returnValue = _mapper.Map<Timeslot, TimeSlotViewModel>(data);
            return returnValue;
        }

        public TimeSlotViewModel Update(int id, TimeSlotViewModel item)
        {
            var data = _repo.GetById(id);

            data.BeginDatetime = item.BeginDatetime;
            data.EndDatetime = item.EndDatetime;
            data.EngineerID = item.EngineerID;
            data.Rate = item.Rate;
            data.Status = item.Status;

            var updateObjected =  _repo.Update(data);
            return _mapper.Map<Timeslot, TimeSlotViewModel>(updateObjected);
        }
    }
}
