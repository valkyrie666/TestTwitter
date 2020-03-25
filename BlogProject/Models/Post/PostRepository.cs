using BlogProject.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _appDbContext;

        public PostRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IEnumerable<Post> GetPosts => _appDbContext.Posts.OrderByDescending(p => p.Date);

        public IEnumerable<Post> GetPostsByAuthor(string author)
        {
            return _appDbContext.Posts.Where(p => p.Author == author).OrderByDescending(p => p.Date);
        }

        public IEnumerable<Post> SearchPosts(string searchValue)
        {
            return _appDbContext.Posts.Where(p => p.Title.Contains(searchValue)); // || p => p.Text.Ccontains(searchValue));
        }

        public Post GetById(string id)
        {
            return _appDbContext.Posts.FirstOrDefault(p => p.Id == id);
        }

        public void CreatePost(Post post)
        {
            Random random = new Random(200);
            post.Id = post.Title.ToLower().Replace(" ", "_") + "_" + random.Next();
            post.Date = DateTime.Now;
            _appDbContext.Posts.Add(post);
            _appDbContext.SaveChanges();
        }

        public void DeletePost(string id)
        {
            var post = GetById(id);
            _appDbContext.Remove(post);
            _appDbContext.SaveChanges();
        }

        public void EditPost(Post post)
        {
            var originalPost = _appDbContext.Posts.Find(post.Id);
            if (originalPost == null) {
                throw new AppException("Post not found");
            }

            originalPost.Title = post.Title;
            originalPost.Text = post.Text;

            _appDbContext.Posts.Update(originalPost);
            _appDbContext.SaveChanges();
        }
    }
}
