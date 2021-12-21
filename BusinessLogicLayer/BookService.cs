using BusinessLogicContracts;
using DataAccessContracts;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer
{
    public class BookService : IBookService
    {
        private readonly IBook bookRepository;

        public BookService(IBook bookRepository)
        {
            this.bookRepository = bookRepository;
        }

        public Book Delete(Book entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Book> GetAll()
        {
            throw new NotImplementedException();
        }

        public Book GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public Book Insert(Book entity)
        {
            throw new NotImplementedException();
        }

        public Book Update(Book entity)
        {
            throw new NotImplementedException();
        }
    }
}
