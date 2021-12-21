using DataAccessContracts;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer
{
    public class BookRepository : IBook
    {
        private readonly MyDbContext _myDbContext;

        public BookRepository(MyDbContext myDbContext)
        {
            this._myDbContext = myDbContext;
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
