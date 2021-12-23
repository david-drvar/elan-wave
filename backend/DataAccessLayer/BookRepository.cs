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
            entity.IsDeleted = true;
            _myDbContext.Book.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }

        public IEnumerable<Book> GetAll()
        {
            return _myDbContext.Book;
        }

        public Book GetById(int Id)
        {
            return _myDbContext.Book.Find(Id);
        }

        public Book Insert(Book entity)
        {
            entity.BookId = Guid.NewGuid().ToString();
            var Book = _myDbContext.Book.Add(entity);
            _myDbContext.SaveChanges();
            return Book.Entity;
        }

        public Book Update(Book entity)
        {
            _myDbContext.Book.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }
    }
}
