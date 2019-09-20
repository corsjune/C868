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
    public class EngineerController : ControllerBase
    {
        private IEngineerService _engineers;
        public EngineerController(IEngineerService engineers)
        {
            _engineers = engineers;
        }
        // GET: api/Engineer
        [HttpGet]
        public IActionResult Get()
        {
            var response = _engineers.GetAll();
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // GET: api/Engineer/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = _engineers.GetById(id);
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // POST: api/Engineer
        [HttpPost]
        public IActionResult Post([FromBody] EngineerViewModel value)
        {
           var response =  _engineers.Add(value);
            return StatusCode((int)HttpStatusCode.Created, response);
        }

        // PUT: api/Engineer/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] EngineerViewModel value)
        {
            var response = _engineers.Update(id, value);
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response =  _engineers.Delete(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
