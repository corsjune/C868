using PiBooking.Core.Interfaces.Repository;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using System.Collections.Generic;

namespace PiBooking.Application.Services
{
    public class CustomerService : BaseService, ICustomerService
    {

        ICustomerRepository _repo;

        public CustomerService(ICustomerRepository repo) : base()
        {
            _repo = repo;
        }

        public CustomerAccount Add(CustomerAccount item)
        {
            var foundCustomer = _repo.GetByPersonFields(item.LastName, item.FirstName, item.Email);
            if (foundCustomer != null)
                return foundCustomer;
            else
                return _repo.Add(item);
        }

        public int Delete(int customerID)
        {
            var data = _repo.GetById(customerID);
            return _repo.Delete(data);
        }

        public IEnumerable<CustomerAccount> GetAll()
        {
            return _repo.GetAll();
        }

        public CustomerAccount GetById(int id)
        {
            return _repo.GetById(id);
        }

        public CustomerAccount Update(int customerID, CustomerAccount item)
        {
            return _repo.Update(item);
        }
    }
}
