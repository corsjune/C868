using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSlotController : ControllerBase
    {
        private ITimeSlotService _timeSlots;
        public TimeSlotController(ITimeSlotService timeSlots)
        {
            _timeSlots = timeSlots;
        }
        // GET: api/TimeSlot
        [HttpGet]
        public IActionResult Get()
        {
            var response = _timeSlots.GetAll();
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // GET: api/TimeSlot/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var response = _timeSlots.GetById(id);
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // POST: api/TimeSlot
        [HttpPost]
        public IActionResult Post([FromBody] TimeSlotViewModel value)
        {
            var response = _timeSlots.Add(value);
            return StatusCode((int)HttpStatusCode.Created, response);
        }

        // PUT: api/TimeSlot/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TimeSlotViewModel value)
        {
            var response = _timeSlots.Update(id, value);
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = _timeSlots.Delete(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
