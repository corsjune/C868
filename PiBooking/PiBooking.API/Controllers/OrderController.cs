using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Mvc.RenderViewToString;
using PiBooking.Core.AppSettings;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.Other;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orders;
        private ICustomerService _customers;
        private IJobService _jobs;
        private IRazorViewToStringRenderer _razor;
        private IEmailService _email;
        private string _invoiceSubject;
        private string _BccEmail;
        IMapper _mapper;
        public OrderController(IOrderService orders, ICustomerService customers, IJobService jobs , IMapper mappers,
                        IRazorViewToStringRenderer razor, IEmailService email, IOptions<AppSettings> settings)
        {
            _orders = orders;
            _mapper = mappers;
            _customers = customers;
            _jobs = jobs;

            _razor = razor;
            _email = email;
            _invoiceSubject = settings.Value.EmailSMTPSubject;
            _BccEmail = settings.Value.EmailFrom;
        }
        //// GET: api/TimeSlot
        //[HttpGet]
        //public IActionResult Get()
        //{
        //    int engineerID = 1;
        //    DateTime startDateRange = Convert.ToDateTime("2019-08-25");
        //    DateTime endDateRange = Convert.ToDateTime("2019-09-30");

        //    var response = _mapper.Map<List<TimeSlot>, List<TimeSlotViewModel>>((List<TimeSlot>)_timeSlots.GetAll(engineerID, startDateRange, endDateRange));   
        //    return StatusCode((int)HttpStatusCode.OK, response);
        //}

        //// GET: api/TimeSlot/5
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{ 
        //    var response =  _mapper.Map<TimeSlot, TimeSlotViewModel>(_timeSlots.GetById(id));  
        //    return StatusCode((int)HttpStatusCode.OK, response);
        //}

        // POST: api/TimeSlot
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderViewModel value)
        {
      

            var customer = _mapper.Map<CustomerAccount>(value.Customer);
            var job = _mapper.Map<Job>(value.Job);
            var timeslots = _mapper.Map<List<TimeSlot>>(value.TimeSlots);

            //create or return existing customer
            customer = _customers.Add(customer);

            //create or return job
            job.CustomerId = customer.CustomerId;
            job = _jobs.Add(job);

            //create the order entity
            var order = new Order();
            order.JobID = job.JobId;
            order.HasPaid =false;
            order.Signature = value.Signature;
            order.TimeSlots = timeslots;

            //add to persistance store
            //convert return model into viewmodel for further processing
            var added = RefreshViewModel(
                _orders.Add(order)
                );
             
             //TODO: Port the emails to a queue based solution
            //create and send invoice
             string body = await _razor.RenderViewToStringAsync("/Email/Templates/Invoice.cshtml", added);
            _email.SendMail(new List<string>() { customer.Email }, new List<string>(), new List<string>() { _BccEmail },
                _invoiceSubject, body);


            return StatusCode((int)HttpStatusCode.Created, added);
        }

        private OrderViewModel RefreshViewModel(Order order)
        {
            var returnObject = new OrderViewModel();
            var job = _jobs.GetById(order.JobID);

            returnObject.Job = _mapper.Map<JobViewModel>(job);
            returnObject.Customer = _mapper.Map<CustomerViewModel>(_customers.GetById(job.CustomerId));
            returnObject.TimeSlots = _mapper.Map<List<TimeSlotViewModel>>(order.TimeSlots);
            returnObject.Signature = order.Signature;
            returnObject.UpdateDate = order.UpdateDate;
            returnObject.CreateDate = order.CreateDate;
            returnObject.Total = order.Total;
            returnObject.HasPaid = order.HasPaid;
            returnObject.OrderID = order.OrderID;

            return returnObject;
        }

        //// PUT: api/TimeSlot/5
        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody] TimeSlotViewModel value)
        //{
        //    var updated = _mapper.Map<TimeSlotViewModel, TimeSlot>(value);
        //    var response = _timeSlots.Update(id, updated);

        //    return StatusCode((int)HttpStatusCode.OK, _mapper.Map<TimeSlot, TimeSlotViewModel>(response)); 
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    var response = _timeSlots.Delete(id);
        //    return StatusCode((int)HttpStatusCode.NoContent);
        //}
    }
}
