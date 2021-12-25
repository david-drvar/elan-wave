using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using Models;
using BusinessLogicContracts;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService bookService;

        public BooksController(IBookService bookService)
        {
            this.bookService = bookService;
        }

        // GET: api/Books
        [HttpGet]
        public IActionResult GetBook()
        {
            return Ok(bookService.GetAll());
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            return Ok(bookService.GetById(id));
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutBook([FromBody] Book book)
        {
            return Ok(bookService.Update(book));
        }

        // POST: api/Books
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public IActionResult PostBook([FromBody] Book book)
        {
            return Ok(bookService.Insert(book));
        }

        // DELETE: api/Books
        [HttpDelete]
        public IActionResult DeleteBook([FromBody] Book book)
        {
            return Ok(bookService.Delete(book));
        }

        //private bool BookExists(int id)
        //{
        //    return _context.Book.Any(e => e.BookId == id);
        //}
    }
}
