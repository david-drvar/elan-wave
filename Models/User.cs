using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class User
    {
        [Required]
        [Key]
        public int UserAccountID { get; set; }

        [Column(TypeName = "varchar(45)")]
        public string Username { get; set; }

        [Column(TypeName = "varchar(45)")]
        public string Password { get; set; }
        public bool IsDeleted { get; set; }

        public User ()
        {

        }

        public User(int userAccontId, string username, string password, bool isDeleted)
        {
            this.UserAccountID = userAccontId;
            this.Username = username;
            this.Password = password;
            this.IsDeleted = isDeleted;
        }



    }
}
