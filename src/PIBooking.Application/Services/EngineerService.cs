using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Models;
using Dapper.Contrib.Extensions;
using System.Data.SqlClient;
using PiBooking.Core.Interfaces.Services;
namespace PiBooking.Application.Services
{
    public class EngineerService : BaseService, IEngineerService
    {
        IEngineerRepository _repo;


        public EngineerService(IEngineerRepository repo) : base()
        {
            _repo = repo;
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
