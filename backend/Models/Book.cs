using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Book
    {
        [Required]
        [Key]
        [Column(TypeName = "char(36)")]
        public string BookId { get; set; }

        [Required]
        [Column(TypeName = "char(13)")]
        public string ISBN { get; set; }

        [Required]
        [Column(TypeName = "varchar(256)")]
        public string Title { get; set; }

        [Required]
        [Column(TypeName = "varchar(256)")]
        public string Author { get; set; }

        [Required]
        [Column(TypeName = "varchar(128)")]
        public string Genre { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public Book ()
        {

        }

        public Book(string bookId, string isbn, string title, string author, string genre, bool isDeleted)
        {
            if (bookId == "" || isbn == "" || title == "" || author == "" || genre == "")
                throw new Exception();
            this.BookId = bookId;
            this.ISBN = isbn;
            this.Title = title;
            this.Author = author;
            this.Genre = genre;
            this.IsDeleted = isDeleted; 
        }
    }
}