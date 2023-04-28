using ShoppingApi.Models;
using ShoppingApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ShoppingApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TagController : ControllerBase
{
    private readonly ILogger<TagController> _logger;

    public TagController(ILogger<TagController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<List<Tag>> GetAll() => TagService.GetAll();

    [HttpGet("{id}")]
    public ActionResult<Tag> Get(int id)
    {
        var tag = TagService.Get(id);

        if (tag == null)
            return NotFound();

        return tag;
    }

    [HttpPost]
    public IActionResult Create(Tag tag)
    {
        TagService.Add(tag);
        return CreatedAtAction(nameof(Get), new { id = tag.Id }, tag);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Tag tag)
    {
        if (id != tag.Id)
            return BadRequest();

        var existingTag = TagService.Get(id);
        if (existingTag is null)
            return NotFound();

        TagService.Update(tag);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var tag = TagService.Get(id);

        if (tag is null)
            return NotFound();

        TagService.Delete(id);

        return NoContent();
    }
}
