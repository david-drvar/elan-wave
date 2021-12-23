using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicContracts
{
    public interface IBookService : IService<Book, int>
    {
        public bool CheckISBN13(string isbn);
    }
}
