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
            return userRepository.Delete(entity);
        }

        public IEnumerable<User> GetAll()
        {
            return userRepository.GetAll();
        }

        public User GetById(int Id)
        {
            return userRepository.GetById(Id);
        }

        public User Insert(User entity)
        {
            return userRepository.Insert(entity);
        }

        public User Update(User entity)
        {
            return userRepository.Update(entity);
        }
    }
}
