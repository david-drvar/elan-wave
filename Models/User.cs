using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class User
    {
        [Required]
        [Key]
        [Column(TypeName = "char(36)")]
        public string UserAccountID { get; set; }

        [Required]
        [Column(TypeName = "varchar(45)")]
        public string Username { get; set; }

        [Required]
        [Column(TypeName = "varchar(45)")]
        public string Password { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public User ()
        {

        }

        public User(string userAccontId, string username, string password, bool isDeleted)
        {
            this.UserAccountID = userAccontId;
            this.Username = username;
            this.Password = password;
            this.IsDeleted = isDeleted;
        }



    }
}
