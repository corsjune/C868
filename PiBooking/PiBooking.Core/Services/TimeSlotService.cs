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

namespace PiBooking.Core.Services
{
    public class TimeSlotService : BaseService, ITimeSlotService
    {
        ITimeSlotRepository _repo;


        public TimeSlotService(ITimeSlotRepository repo) : base()
        {
            _repo = repo; 
        }

        public TimeSlot Add(TimeSlot item)
        {
            return _repo.Add(item); 
        }

        public int Delete(int id)
        {
            var data = _repo.GetById(id);
            return _repo.Delete(data);
        }

        public IEnumerable<TimeSlot> GetAll(int engineerID, DateTime startDateRange, DateTime endDateRange)
        { 
 
            return _repo.GetAll(engineerID, startDateRange, endDateRange);
        }

        public TimeSlot GetById(int id)
        {
            return _repo.GetById(id); 
        }

        public TimeSlot Update(int id, TimeSlot item)
        {
            var data = _repo.GetById(id);

            data.BeginDatetime = item.BeginDatetime;
            data.EndDatetime = item.EndDatetime;
            data.EngineerID = item.EngineerID;
            data.Rate = item.Rate;
            data.Status = item.Status;

            return _repo.Update(data);
        }
    }
}
