using System;
using System.Collections.Generic;
using System.Linq;
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
        public IEnumerable<TimeSlotViewModel> Get()
        {
            return _timeSlots.GetAll();
        }

        // GET: api/TimeSlot/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/TimeSlot
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/TimeSlot/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
