using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public class CommentRepository : ICommentRepository
    {
        private AppDbContext _appDbContext;

        public CommentRepository(AppDbContext appDbContext) {
            _appDbContext = appDbContext;
        }
        
        public IEnumerable<Comment> GetPostComments(int postId)
        {
            return _appDbContext.Comments.Where(c => c.PostId == postId).OrderByDescending(c => c.Date);
        }
    }
}
