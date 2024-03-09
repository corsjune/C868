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
    public class JobService : BaseService, IJobService
    {

        IJobRepository _repo;

        public JobService(IJobRepository repo) : base()
        {
            _repo = repo;
        }

        public Job Add(Job item)
        {
            var foundJob = _repo.GetByCustomerAndJobName(item.CustomerId, item.JobName);
            if (foundJob != null)
                return foundJob;
            else
                return _repo.Add(item);
        }

        public int Delete(int id)
        {
            var data = _repo.GetById(id);
            return _repo.Delete(data);
        }

        public IEnumerable<Job> GetAll()
        {
            return _repo.GetAll();
        }

        public Job GetById(int id)
        {
            return _repo.GetById(id);
        }

        public Job Update(int id, Job item)
        {
            throw new NotImplementedException();
        }
    }
}
