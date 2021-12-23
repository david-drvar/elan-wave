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
            if (!CheckISBN13(entity.ISBN)) 
                throw new Exception();
            
            return bookRepository.Insert(entity);
        }

        public Book Update(Book entity)
        {
            return bookRepository.Update(entity);
        }

        public bool CheckISBN13(string isbn)
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
