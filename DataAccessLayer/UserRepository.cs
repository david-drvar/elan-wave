using DataAccessContracts;
using Models;
using System;
using System.Collections.Generic;

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

        public IEnumerable<User> GetAll()
        {
            return _myDbContext.User;
        }

        public User GetById(int Id)
        {
            return _myDbContext.User.Find(Id);
        }

        public User Insert(User entity)
        {
            var User = _myDbContext.User.Add(entity);
            _myDbContext.SaveChanges();
            return User.Entity;
        }

        public User Update(User entity)
        {
            _myDbContext.User.Update(entity);
            _myDbContext.SaveChanges();
            return entity;
        }
    }
}
