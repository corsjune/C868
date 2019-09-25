using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.ViewModels;
using AutoMapper;

namespace PiBooking.Core.Services
{
    public class EngineerService : BaseService, IEngineerService
    {
        IEngineerRepository _repo;
        IMapper _mapper;

        public EngineerService(IEngineerRepository repo, IMapper mapper) : base()
        {
            _repo = repo;
            _mapper = mapper;
        }

        public Engineer Add(Engineer item)
        {
            return _repo.Add(item);
        }

        public int Delete(int id)
        {
            var data = _repo.GetById(id);
            return _repo.Delete(data);
        }

        public IEnumerable<Engineer> GetAll()
        {
            return _repo.GetAll();
        }

        public Engineer GetById(int id)
        {
            return _repo.GetById(id);
        }

        public Engineer Update(int id, Engineer item)
        {
            var data = _repo.GetById(id);

            data.Email = item.Email;
            data.EmployeeID = item.EmployeeID;
            data.FirstName = item.FirstName;
            data.LastName = item.LastName;
            data.Phone = item.Phone;
            data.Rate = item.Rate;
            data.WorkDayBeginTime = item.WorkDayBeginTime;
            data.WorkDayEndTime = item.WorkDayEndTime;
            data.AvailableEndDate = item.AvailableEndDate;
            data.AvailableStartDate = item.AvailableStartDate;

            return _repo.Update(data);
        }
    }
}
