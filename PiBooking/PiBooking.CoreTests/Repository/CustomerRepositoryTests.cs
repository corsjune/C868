using Microsoft.VisualStudio.TestTools.UnitTesting;
using PiBooking.Core.Models;
using PiBooking.Core.Repository;
using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.Extensions.Options;
using PiBooking.Core.Services;

namespace PiBooking.Core.Repository.Tests
{
    [TestClass()]
    public class CustomerRepositoryTests
    { 
        CustomerAccount testAccount = new CustomerAccount();
        private IOptions<AppSettings.AppSettings> _config;
        private CustomerService service;

        public CustomerRepositoryTests()
        {
            testAccount.Email = "testemail@testemail.com";
            testAccount.Address = "100 Main ";
            testAccount.Phone = "704-555-1212";
            testAccount.FirstName = "John";
            testAccount.LastName = "Doe";
            testAccount.Company = "Acme";
            testAccount.City = "Charlotte";
            testAccount.State = "NC";
            testAccount.ZipCode = "28278";

            _config = Options.Create<AppSettings.AppSettings>(new AppSettings.AppSettings());
            _config.Value.PersistanceConnectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=E:\\Code\\C868\\PiBooking\\PIBooking.Infrastructure\\PIBooking.mdf;Integrated Security=True";

            var repo = new CustomerRepository(_config);
            service = new CustomerService(repo);
        }

        [TestMethod()]
        public void CRUDTest()
        {
             
            //add
            var added = service.Add(testAccount);
            Assert.IsNotNull(added);

            //get all
            var all = (List<CustomerAccount>)service.GetAll();
            Assert.IsNotNull(all.Find(x => x.Email == testAccount.Email));


            //get by id
            var byid = service.GetById(added.CustomerId);
            Assert.IsTrue(byid.Company == "Acme");

            //update
            added.Company = "Duke Energy";
            service.Update(added.CustomerId, added);

            var upated = service.GetById(added.CustomerId);
            Assert.IsTrue(upated.Company == "Duke Energy");

            //deleted
            service.Delete(added.CustomerId);
            Assert.IsNull(service.GetById(added.CustomerId));
        }
    }
}