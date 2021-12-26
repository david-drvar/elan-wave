using BusinessLogicContracts;
using DataAccessContracts;
using Models;
using Models.DTOs;
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

        public User FindByUsername(string username)
        {
            return userRepository.FindByUsername(username);
        }

        public IEnumerable<User> GetAll()
        {
            return userRepository.GetAll();
        }

        public User GetById(int Id)
        {
            return userRepository.GetById(Id);
        }

        public User GetByUsernameAndPassword(UsernamePasswordDTO dto)
        {
            return userRepository.GetByUsernameAndPassword(dto);
        }

        public User Insert(User entity)
        {
            User user = this.FindByUsername(entity.Username);
            if (user != null)
                throw new Exception();
            return userRepository.Insert(entity);
        }

        public bool IsUsernameUnique(string username)
        {
            return userRepository.IsUsernameUnique(username);
        }

        public User Update(User entity)
        {
            return userRepository.Update(entity);
        }
    }
}
