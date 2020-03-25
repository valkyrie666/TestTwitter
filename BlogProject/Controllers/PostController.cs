using BlogProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet("{id}")]
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
