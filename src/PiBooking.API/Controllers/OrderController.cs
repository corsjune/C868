using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Mvc.RenderViewToString;
using Newtonsoft.Json;
using PiBooking.Application.Other;
using PiBooking.Application.AppSettings;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.Other;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private IOrderService _orders;
        private ICustomerService _customers;
        private IEngineerService _engineers;
        private IJobService _jobs;
        private IRazorViewToStringRenderer _razor;
        private IEmailService _email;
        private string _invoiceSubject;
        private string _BccEmail;
        IMapper _mapper;
        public OrderController(IOrderService orders, ICustomerService customers, IEngineerService engineers, IJobService jobs, IMapper mappers,
                        IRazorViewToStringRenderer razor, IEmailService email, IOptions<AppSettings> settings)
        {
            _orders = orders;
            _mapper = mappers;
            _customers = customers;
            _engineers = engineers;
            _jobs = jobs;

            _razor = razor;
            _email = email;
            _invoiceSubject = settings.Value.EmailSMTPSubject;
            _BccEmail = settings.Value.EmailFrom;
        }
        //// GET: api/Order
        [HttpGet]
        public IActionResult Get()
        {
            //var response = _mapper.Map<List<Order>, List<OrderViewModel>>((List<Order>)_orders.GetAll());

            //TODO: This is going  to be expensive
            //Find a better way
            var response = _orders.GetAll().Select(
                 x => this.BuildOrderViewModel(x)
                 ).ToList<OrderViewModel>();

            return StatusCode((int)HttpStatusCode.OK, response);
        }

        [Route("GetAllCustomers")]
        public IActionResult GetAllCustomers(int customerID)
        {
            var response = _mapper.Map<List<CustomerAccount>, List<CustomerViewModel>>((List<CustomerAccount>)_customers.GetAll());
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        [Route("GetByCustomer")]
        public IActionResult GetByCustomer(int customerID)
        {
            //TODO: This is going  to be expensive
            //Find a better way
            var response = _orders.GetAll(customerID).Select(
                 x => this.BuildOrderViewModel(x)
                 ).ToList<OrderViewModel>();

            return StatusCode((int)HttpStatusCode.OK, response);

        }

        //// GET: api/Order/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = this.BuildOrderViewModel(_orders.GetById(id));
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // POST: api/Order
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] OrderViewModel value)
        {
            try
            {
                if (value.TimeSlots == null || value.TimeSlots.Count < 1)
                {
                    throw new AppException("You have not chosen any timesheets to book. " +
                        "Please go back and select timeslots for this engineer");

                }

                var customer = _mapper.Map<CustomerAccount>(value.Customer);
                var job = _mapper.Map<Job>(value.Job);

                var tz = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");

                //adjust from UTC to EST
                value.TimeSlots.ForEach(
                   x =>
                   {
                       x.BeginDatetime = TimeZoneInfo.ConvertTimeFromUtc(x.BeginDatetime, tz);
                       x.EndDatetime = TimeZoneInfo.ConvertTimeFromUtc(x.EndDatetime, tz);
                   }
                   );

                var timeslots = _mapper.Map<List<TimeSlot>>(value.TimeSlots);

                //create or return existing customer
                customer = _customers.Add(customer);

                //create or return job
                job.CustomerId = customer.CustomerId;
                job = _jobs.Add(job);

                //create the order entity
                var order = new Order();
                order.JobID = job.JobId;
                order.HasPaid = false;
                order.Signature = value.Signature;
                order.TimeSlots = timeslots;

                //add to persistance store 
                //convert return model into viewmodel for further processing
                var added = BuildOrderViewModel(
                    _orders.Add(order)
                    );

                //TODO: Port the emails to a queue based solution
                //create and send invoice
                string body = await _razor.RenderViewToStringAsync("/Email/Templates/Invoice.cshtml", added);
                _email.SendMail(new List<string>() { customer.Email }, new List<string>(), new List<string>() { _BccEmail },
                    _invoiceSubject, body);


                return StatusCode((int)HttpStatusCode.Created, added);
            }
            catch (AppException ex)
            {
                return StatusCode((int)HttpStatusCode.UnprocessableEntity, new AppException(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new AppException(ex.Message));

            }
        }

        private OrderViewModel BuildOrderViewModel(Order order)
        {

            var returnObject = new OrderViewModel();
            var job = _jobs.GetById(order.JobID);

            //TODO: this probably needs to wrap Job & Customer also
            if (order.TimeSlots?.Count > 0)
            {
                var engineer = this._engineers.GetById(order.TimeSlots.First().EngineerID);
                returnObject.Engineer = _mapper.Map<EngineerViewModel>(engineer);
                returnObject.TimeSlots = _mapper.Map<List<TimeSlotViewModel>>(order.TimeSlots);
            }

            returnObject.Job = _mapper.Map<JobViewModel>(job);
            returnObject.Customer = _mapper.Map<CustomerViewModel>(_customers.GetById(job.CustomerId));

            returnObject.Signature = order.Signature;
            returnObject.UpdateDate = order.UpdateDate;
            returnObject.CreateDate = order.CreateDate;
            returnObject.Total = order.Total;
            returnObject.HasPaid = order.HasPaid;
            returnObject.OrderID = order.OrderID;

            return returnObject;
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] OrderViewModel value)
        {
            var updated = _mapper.Map<OrderViewModel, Order>(value);
            var response = _orders.Update(id, updated);
            return StatusCode((int)HttpStatusCode.OK, this.BuildOrderViewModel(response));
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = _orders.Delete(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
