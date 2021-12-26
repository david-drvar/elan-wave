using BusinessLogicContracts;
using Library.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService userService;

        public AuthenticationController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] UsernamePasswordDTO loginDTO)
        {
            var user = userService.GetByUsernameAndPassword(loginDTO);
            return Ok(new { Token = JwtTokenHelper.GenerateJwtToken(user), Username = loginDTO.Username, Id = user.UserAccountID });
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UsernamePasswordDTO dto)
        {
            User user = userService.Insert(new Models.User("", dto.Username, dto.Password, false));
            return Ok(new { Token = JwtTokenHelper.GenerateJwtToken(user), Username = dto.Username, Id = user.UserAccountID });
        }
    }
}
