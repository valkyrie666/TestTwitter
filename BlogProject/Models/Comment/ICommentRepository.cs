using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public interface ICommentRepository
    {
        IEnumerable<Comment> GetPostComments(int postId);
    }
}
