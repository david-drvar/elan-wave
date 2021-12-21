using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public bool IsDeleted { get; set; }

        public Book ()
        {

        }

        public Book(int bookId, string isbn, string title, string author, string genre, bool isDeleted)
        {
            this.BookId = bookId;
            this.ISBN = isbn;
            this.Title = title;
            this.Author = author;
            this.Genre = genre;
            this.IsDeleted = isDeleted; 
        }
    }
}