using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using PiBooking.Core.Interfaces.Services;
using PiBooking.Core.ViewModels;
using PiBooking.Core.Models;
using PiBooking.Application.AppSettings;
using PiBooking.Core.Other;
using System.Net;
using Newtonsoft.Json;

//Code was adapted from the following reference
//https://jasonwatmore.com/post/2018/09/08/aspnet-core-21-basic-authentication-tutorial-with-example-api
//https://jasonwatmore.com/post/2018/06/26/aspnet-core-21-simple-api-for-authentication-registration-and-user-management



namespace PiBooking.API.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        IOptions<AppSettings> _settings;

        public UserController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> settings)
        {
            _userService = userService;
            _mapper = mapper;
            _settings = settings;

            try
            {
                var users = (List<User>)_userService.GetAll();
                if (users.Count == 0)
                {
                    _userService.Add(new User() { Username = "admin", FirstName = "Admin", LastName = "Admin" }, "changethispassword");
                }
            }
            catch
            {
                //eat any errors
            }
        }

        public class AuthenticationViewModel
        {
            public string email { get; set; }
            public string password { get; set; }
        }


        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticationViewModel userDto)
        {
            //yes, the dto is listed as email to support the client library
            //we will use as username
            var user = _userService.Authenticate(userDto.email, userDto.password);

            if (user == null)
                return BadRequest(new { Message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_settings.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            });
        }

        [HttpPost()]
        public IActionResult Post([FromBody] UserViewModel userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            try
            {
                // save 
                var added = _userService.Add(user, userDto.Password);
                return Ok(_mapper.Map<UserViewModel>(added));

            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            var users = _userService.GetAll();
            var userDtos = _mapper.Map<IList<UserViewModel>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserViewModel>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UserViewModel userDto)
        {
            // map dto to entity and set id
            var user = _mapper.Map<User>(userDto);
            user.Id = id;

            try
            {
                // save 
                var updated = _userService.Update(id, user, userDto.Password);
                return Ok(_mapper.Map<UserViewModel>(updated));
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
