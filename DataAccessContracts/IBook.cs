using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace DataAccessContracts
{
    public interface IBook : ICrud<Book,int>
    {
    }
}
