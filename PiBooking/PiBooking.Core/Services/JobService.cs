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

namespace PiBooking.Core.Services
{
    public class JobService : BaseService, IJobService
    {
        public JobService(IJobRepository repo) : base()
        {

        }

        public Job Add(Job item)
        {
            throw new NotImplementedException();
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Job> GetAll()
        {
            throw new NotImplementedException();
        }

        public Job GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Job Update(int id, Job item)
        {
            throw new NotImplementedException();
        }
    }
}
