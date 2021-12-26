using BusinessLogicContracts;
using DataAccessContracts;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return bookRepository.Delete(entity);
        }

        public IEnumerable<Book> GetAll()
        {
            return bookRepository.GetAll();
        }

        public Book GetById(int Id)
        {
            return bookRepository.GetById(Id);
        }

        public Book Insert(Book entity)
        {
            return bookRepository.Insert(entity);
        }

        public Book Update(Book entity)
        {
            return bookRepository.Update(entity);
        }
        
    }
}
