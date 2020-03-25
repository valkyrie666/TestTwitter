using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetPosts { get; }

        IEnumerable<Post> GetPostsByAuthor(string author);

        IEnumerable<Post> SearchPosts(string searchValue);

        Post GetById(string id);

        void CreatePost(Post post);

        void DeletePost(string id);

        void EditPost(Post post);
    }
}
