using DataAccessContracts;
using Models;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;

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
            User user =  _myDbContext.User.Where(user => user.Username == dto.Username && user.Password == dto.Password && user.IsDeleted == false).FirstOrDefault();
            if (user == null)
                throw new Exception("User not found!");
            return user;
        }

        public User Insert(User entity)
        {
            if (!validateUser(entity))
                throw new Exception();
            entity.UserAccountID = Guid.NewGuid().ToString();
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
            if (!validateUser(entity))
                throw new Exception();
            _myDbContext.User.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }

        private bool validateUser(User user)
        {
            if (user.Password == "" || user.Username == "")
                return false;
            return true;
        }
    }
}
