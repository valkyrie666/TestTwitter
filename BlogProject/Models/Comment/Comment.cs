using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogProject.Models
{
    public class Comment
    {
        public string Id { get; set; }
        public string Author { get; set; }
        public int PostId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
