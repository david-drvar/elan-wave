using Models;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicContracts
{
    public interface IUserService : IService<User, int>
    {
        public User FindByUsername(string username);
        public User GetByUsernameAndPassword(UsernamePasswordDTO dto);
        public bool IsUsernameUnique(string username);
    }
}
