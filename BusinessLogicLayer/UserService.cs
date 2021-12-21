using BusinessLogicContracts;
using DataAccessContracts;
using Models;
using System;
using System.Collections.Generic;

namespace BusinessLogicLayer
{
    public class UserService : IUserService
    {
        private readonly IUser userRepository;

        public UserService(IUser userRepository)
        {
            this.userRepository = userRepository;
        }

        public User Delete(User entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public User Insert(User entity)
        {
            throw new NotImplementedException();
        }

        public User Update(User entity)
        {
            throw new NotImplementedException();
        }
    }
}
