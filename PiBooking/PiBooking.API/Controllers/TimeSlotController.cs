using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TimeSlotController : ControllerBase
    {
        private ITimeSlotService _timeSlots;
        IMapper _mapper;
        public TimeSlotController(ITimeSlotService timeSlots, IMapper mappers)
        {
            _timeSlots = timeSlots;
            _mapper = mappers;
        }

        // GET: api/TimeSlot
        [HttpGet]
        public IActionResult Get()
        {
            var response = _mapper.Map<List<TimeSlot>, List<TimeSlotViewModel>>((List<TimeSlot>)_timeSlots.GetAll());
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // GET: api/TimeSlot
        [HttpGet]
        [AllowAnonymous]
        [Route("GetAllAvailableByEngineer")]
        public IActionResult GetAllAvailableByEngineerAndDateRange(int engineerID, string startDateRangeJson, string endDateRangeJson)
        {

            DateTime? startDateRange = JsonConvert.DeserializeObject<DateTime>(startDateRangeJson);
            DateTime? endDateRange = JsonConvert.DeserializeObject<DateTime>(endDateRangeJson);

            startDateRange = startDateRange.HasValue? startDateRange :DateTime.Now;
            endDateRange =  endDateRange.HasValue ? endDateRange: DateTime.Now.AddDays(8) ;

            var response = _mapper.Map<List<TimeSlot>, List<TimeSlotViewModel>>((List<TimeSlot>)_timeSlots.GetAllAvailableByEngineerAndDateRange(engineerID, startDateRange.Value, endDateRange.Value));

            //var tz = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            //response.ForEach(x =>
            //{
            //    x.BeginDatetime = TimeZoneInfo.ConvertTimeFromUtc(x.BeginDatetime, tz);
            //    x.EndDatetime = TimeZoneInfo.ConvertTimeFromUtc(x.EndDatetime, tz);
            //    x.IsBooked = x.Status != 1;
            //}
            //);
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // GET: api/TimeSlot/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        { 
            var response =  _mapper.Map<TimeSlot, TimeSlotViewModel>(_timeSlots.GetById(id));  
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // POST: api/TimeSlot
        [HttpPost]
        public IActionResult Post([FromBody] TimeSlotViewModel value)
        {
            //ignore the end date for now
            value.EndDatetime = value.BeginDatetime.AddHours(1).AddMinutes(-1);


            var added = _mapper.Map<TimeSlotViewModel, TimeSlot>(value); 
            return StatusCode((int)HttpStatusCode.Created, _timeSlots.Add(added));
        }

        // PUT: api/TimeSlot/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TimeSlotViewModel value)
        {
            //ignore the end date for now
            value.EndDatetime = value.BeginDatetime.AddHours(1).AddMinutes(-1);

            var updated = _mapper.Map<TimeSlotViewModel, TimeSlot>(value);
            var response = _timeSlots.Update(id, updated);


            return StatusCode((int)HttpStatusCode.OK, _mapper.Map<TimeSlot, TimeSlotViewModel>(response)); 
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
