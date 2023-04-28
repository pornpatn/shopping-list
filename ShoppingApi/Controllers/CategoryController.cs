using ShoppingApi.Models;
using ShoppingApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ShoppingApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;

    public CategoryController(ILogger<CategoryController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<List<Category>> GetAll() => CategoryService.GetAll();

    [HttpGet("{id}")]
    public ActionResult<Category> Get(int id)
    {
        var category = CategoryService.Get(id);

        if (category == null)
            return NotFound();

        return category;
    }

    [HttpPost]
    public IActionResult Create(Category category)
    {
        CategoryService.Add(category);
        return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Category category)
    {
        if (id != category.Id)
            return BadRequest();

        var existingCategory = CategoryService.Get(id);
        if (existingCategory is null)
            return NotFound();

        CategoryService.Update(category);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var category = CategoryService.Get(id);

        if (category is null)
            return NotFound();

        CategoryService.Delete(id);

        return NoContent();
    }
}
