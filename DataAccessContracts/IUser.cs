using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessContracts
{
    public interface IUser : ICrud<User, int>
    {
    }
}
