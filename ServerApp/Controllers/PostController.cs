using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Models;
using ServerApp.Services;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _postService.GetAllAsync();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var post = await _postService.GetByIdAsync(id);
            if (post == null) return NotFound();
            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Post post)
        {
            await _postService.CreateAsync(post);
            return Ok(post);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Post updated)
        {
            var result = await _postService.UpdateAsync(id, updated);
            if (!result) return NotFound();
            return Ok(updated);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _postService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
