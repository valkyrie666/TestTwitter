using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public interface IUserRepository
    {
        User Authenticate(string username, string password);
        User GetById(int id);
        User GetByUsername(string username);
        IEnumerable<User> GetAll();
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}
