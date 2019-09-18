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

namespace PiBooking.Core.Repository
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

        public EngineerViewModel Add(EngineerViewModel item)
        {
            var before = _mapper.Map<EngineerViewModel, Engineer>(item);

            var after = _repo.Add(before);

            return _mapper.Map<Engineer, EngineerViewModel>(after);
        }

        public int Delete(int id)
        {
            var data = _repo.GetById(id);
            return _repo.Delete(data);
        }

        public IEnumerable<EngineerViewModel> GetAll()
        {
            var data = new List<Engineer>(_repo.GetAll());

            var returnValue = _mapper.Map<List<Engineer>, List<EngineerViewModel>>(data);
            return returnValue;
        }

        public EngineerViewModel GetById(int id)
        {
            var data = _repo.GetById(id);

            var returnValue = _mapper.Map<Engineer, EngineerViewModel>(data);
            return returnValue;
        }

        public EngineerViewModel Update(int id, EngineerViewModel item)
        {
            var data = _repo.GetById(id);

            data.Email = item.Email;
            data.EmployeeID = item.EmployeeID;
            data.FirstName = item.FirstName;
            data.LastName = item.LastName;
            data.Phone = item.Phone; 

            var updateObjected = _repo.Update(data);
            return _mapper.Map<Engineer, EngineerViewModel>(updateObjected);
        }
    }
}
