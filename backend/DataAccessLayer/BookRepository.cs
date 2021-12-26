using DataAccessContracts;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return _myDbContext.Book.Where(book => book.IsDeleted == false);
        }

        public Book GetById(int Id)
        {
            return _myDbContext.Book.Find(Id);
        }

        public Book Insert(Book entity)
        {
            if (!ValidateBook(entity) || !CheckISBN13(entity.ISBN))
                throw new Exception();
            entity.BookId = Guid.NewGuid().ToString();
            var Book = _myDbContext.Book.Add(entity);
            _myDbContext.SaveChanges();
            return Book.Entity;
        }

        public Book Update(Book entity)
        {
            if (!ValidateBook(entity) || !CheckISBN13(entity.ISBN))
                throw new Exception();
            _myDbContext.Book.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }

        private bool ValidateBook(Book book)
        {
            if (book.Title == "" || book.ISBN == "" || book.Genre == "" || book.Author == "")
                return false;
            return true;
        }

        private bool CheckISBN13(string isbn)
        {
            isbn = isbn.Replace("-", "").Replace(" ", "");
            if (isbn.Length != 13) return false;
            int sum = 0;
            foreach (var (index, digit) in isbn.Select((digit, index) => (index, digit)))
            {
                if (char.IsDigit(digit)) sum += (digit - '0') * (index % 2 == 0 ? 1 : 3);
                else return false;
            }
            return sum % 10 == 0;
        }
    }
}
