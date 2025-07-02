using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        // Simulated in-memory store
        private static List<Post> Posts = new List<Post>
        {
            new Post { Id = 1, Title = "First Post", Content = "Hello World", Author = "Admin" }
        };

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();
            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Create([FromBody] Post post)
        {
            post.Id = Posts.Count + 1;
            Posts.Add(post);
            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Post updated)
        {
            var post = Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();

            post.Title = updated.Title;
            post.Content = updated.Content;
            post.Author = updated.Author;
            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var post = Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();

            Posts.Remove(post);
            return NoContent();
        }
    }

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public string Author { get; set; } = "";
    }
}
