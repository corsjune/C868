using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.Models;
using PiBooking.Core.ViewModels;

namespace PiBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EngineerController : ControllerBase
    {
        private IEngineerService _engineers;
        IMapper _mapper;

        public EngineerController(IEngineerService engineers, IMapper mappers)
        {
            _engineers = engineers;
            _mapper = mappers;
        }
        // GET: api/Engineer
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            var response = _mapper.Map<List<Engineer>, List<EngineerViewModel>>((List<Engineer>)_engineers.GetAll());
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // GET: api/Engineer/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult Get(int id)
        {
            var response = _mapper.Map<Engineer, EngineerViewModel>(_engineers.GetById(id));
            return StatusCode((int)HttpStatusCode.OK, response);
        }

        // POST: api/Engineer
        [HttpPost]
        public IActionResult Post([FromBody] EngineerViewModel value)
        {
            var added = _mapper.Map<EngineerViewModel, Engineer>(value);
            return StatusCode((int)HttpStatusCode.Created, _engineers.Add(added));
        }

        // PUT: api/Engineer/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] EngineerViewModel value)
        {
            var updated = _mapper.Map<EngineerViewModel, Engineer>(value);
            var response = _engineers.Update(id, updated);

            return StatusCode((int)HttpStatusCode.OK, _mapper.Map<Engineer, EngineerViewModel>(response));
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = _engineers.Delete(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
