using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        [Route("/api/GetTimeSlots")]
        public ActionResult<List<TimeSlotViewModel>> Get()
        {
            var x = new List<TimeSlotViewModel>();
            var y = DateTime.Today.AddHours(18);


 

            return x;
        }

        [HttpPost]
        [Route("/api/UpdateProgress")]
        public ActionResult<string> UpdateProgress(OrderViewModel orderModel)
        {
            var currentJob = orderModel;
            return "1";  //currentJob.JobId;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
