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

namespace PiBooking.Core.Repository
{
    public class JobService : BaseService, IJobService
    {
        public JobService(IJobRepository repo) : base()
        {

        }

        public void Add(JobViewModel item)
        {
            throw new NotImplementedException();
        }

        public void Delete(JobViewModel item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<JobViewModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public JobViewModel GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Update(JobViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}
