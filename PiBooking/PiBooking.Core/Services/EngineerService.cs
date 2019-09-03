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
    public class EngineerService : BaseService, IEngineerService
    {
        public EngineerService(IEngineerRepository repo) : base()
        {

        }

        public void Add(EngineerViewModel item)
        {
            throw new NotImplementedException();
        }

        public void Delete(EngineerViewModel item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EngineerViewModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public EngineerViewModel GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Update(EngineerViewModel item)
        {
            throw new NotImplementedException();
        }
    }
}
