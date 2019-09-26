using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orders;
        IMapper _mapper;
        public OrderController(IOrderService orders, IMapper mappers)
        {
            _orders = orders;
            _mapper = mappers;
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
        public IActionResult Post([FromBody] OrderViewModel value)
        {
            var added = _mapper.Map<OrderViewModel, Order>(value); 
            return StatusCode((int)HttpStatusCode.Created, _orders.Add(added));
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
