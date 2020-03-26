using BlogProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BlogProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IEnumerable<Post> Get()
        {
            return _postRepository.GetPosts.ToArray();
        }

        [HttpGet("author/{username}")]
        public IEnumerable<Post> GetByAuthor(string username)
        {
            return _postRepository.GetPostsByAuthor(username);
        }

        [HttpGet("search/{searchStr}")]
        public IEnumerable<Post> SearchPosts(string searchStr)
        {
            return _postRepository.SearchPosts(searchStr);
        }

        [HttpGet("blog/{id}")]
        public Post GetById(string id)
        {
            return _postRepository.GetById(id);
        }

        [HttpPost("create")]
        public void CreatePost(Post post)
        {
            _postRepository.CreatePost(post);
        }

        [HttpDelete("{id}/delete")]
        public void DeletePost(string id)
        {
            _postRepository.DeletePost(id);
        }

        [HttpPatch("{id}/update")]
        public void UpdatePost(Post post)
        {
            _postRepository.EditPost(post);
        }
    }
}
