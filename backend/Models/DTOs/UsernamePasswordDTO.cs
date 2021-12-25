using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOs
{
    public class UsernamePasswordDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public UsernamePasswordDTO()
        {

        }

        public UsernamePasswordDTO(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }
    }
}
