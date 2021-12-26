using DataAccessContracts;
using Models;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace DataAccessLayer
{
    public class UserRepository : IUser
    {
        private readonly MyDbContext _myDbContext;

        public UserRepository(MyDbContext myDbContext)
        {
            this._myDbContext = myDbContext;
        }
        public User Delete(User entity)
        {
            entity.IsDeleted = true;
            _myDbContext.User.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }

        public User FindByUsername(string username)
        {
            return _myDbContext.User.Where(user => user.Username == username && user.IsDeleted == false).FirstOrDefault();
        }

        public IEnumerable<User> GetAll()
        {
            return _myDbContext.User.Where(user =>  user.IsDeleted == false);
        }

        public User GetById(int Id)
        {
            return _myDbContext.User.Find(Id);
        }

        public User GetByUsernameAndPassword(UsernamePasswordDTO dto)
        {
            User user =  _myDbContext.User.Where(user => user.Username == dto.Username && user.IsDeleted == false).FirstOrDefault();

            if (user == null)
                throw new Exception("User not found!");
            if (!VerifyHashedPassword(user.Password, dto.Password))
                throw new Exception("Wrong password!");
            return user;
        }

        public User Insert(User entity)
        {
            if (!ValidateUser(entity) || !IsUsernameUnique(entity.Username))
                throw new Exception();
            entity.UserAccountID = Guid.NewGuid().ToString();
            entity.Password = HashPassword(entity.Password);
            var User = _myDbContext.User.Add(entity);
            _myDbContext.SaveChanges();
            return User.Entity;
        }

        public bool IsUsernameUnique(string username)
        {
            User user = _myDbContext.User.Where(user => user.Username == username && user.IsDeleted == false).FirstOrDefault();
            if (user == null) //user does not exist
                return true;
            return false;
        }

        public User Update(User entity)
        {
            if (!ValidateUser(entity))
                throw new Exception();
            _myDbContext.User.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }

        private bool ValidateUser(User user)
        {
            if (!UsernameValid(user.Username) || !PasswordValid(user.Password))
                return false;
            return true;
        }

        private bool UsernameValid(string username)
        {
            var regex = @"^[a-z0-9_.-]+$";
            return Regex.Match(username, regex).Success;
        }

        private bool PasswordValid(string password)
        {
            var regex = @"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$";
            return Regex.Match(password, regex).Success;
        }

        private string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        public bool VerifyHashedPassword(string hashedPassword, string password)
        {
            byte[] buffer4;
            if (hashedPassword == null)
            {
                return false;
            }
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            byte[] src = Convert.FromBase64String(hashedPassword);
            if ((src.Length != 0x31) || (src[0] != 0))
            {
                return false;
            }
            byte[] dst = new byte[0x10];
            Buffer.BlockCopy(src, 1, dst, 0, 0x10);
            byte[] buffer3 = new byte[0x20];
            Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, dst, 0x3e8))
            {
                buffer4 = bytes.GetBytes(0x20);
            }
            return buffer3.SequenceEqual(buffer4);
        }
    }
}
