using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using Models;
using BusinessLogicContracts;
using Models.DTOs;
using Library.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(userService.GetAll());
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            return Ok(userService.GetById(id));
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutUser([FromBody] User user)
        {
            return Ok(userService.Update(user));
        }


        [HttpPost, Route("is-username-unique/{username}")]
        public IActionResult IsUsernameUnique([FromRoute] string username)
        {
            return Ok(new { Status = userService.IsUsernameUnique(username)});
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromBody] User user)
        {
            return Ok(userService.Delete(user));
        }

    }
}
