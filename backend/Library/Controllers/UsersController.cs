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

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public IActionResult PostUser([FromBody] UsernamePasswordDTO dto)
        {
            User user = userService.Insert(new Models.User("", dto.Username, dto.Password, false));
            return Ok(new { Token = JwtTokenHelper.GenerateJwtToken(user), Username = dto.Username, Id = user.UserAccountID });
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] UsernamePasswordDTO loginDTO)
        {
            var user = userService.GetByUsernameAndPassword(loginDTO);
            return Ok(new { Token = JwtTokenHelper.GenerateJwtToken(user), Username = loginDTO.Username, Id = user.UserAccountID });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromBody] User user)
        {
            return Ok(userService.Delete(user));
        }

        //private bool UserExists(int id)
        //{
        //    return _context.User.Any(e => e.UserAccountID == id);
        //}
    }
}
