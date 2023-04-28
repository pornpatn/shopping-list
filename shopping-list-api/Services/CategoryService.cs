using ShoppingApi.Models;

namespace ShoppingApi.Services;

public static class CategoryService
{
    static List<Category> Categories { get; }
    static int nextId = 3;
    static CategoryService()
    {
        Categories = new List<Category>
        {
            new Category { Id = 1, Name = "Meats", Note = "" },
            new Category { Id = 2, Name = "Vegetables", Note = "" }
        };
    }

    public static List<Category> GetAll() => Categories;

    public static Category? Get(int id) => Categories.FirstOrDefault(c => c.Id == id);

    public static void Add(Category category)
    {
        category.Id = nextId++;
        Categories.Add(category);
    }

    public static void Delete(int id)
    {
        var category = Get(id);
        if (category is null)
            return;

        Categories.Remove(category);
    }

    public static void Update(Category category)
    {
        var index = Categories.FindIndex(c => c.Id == category.Id);
        if (index == -1)
            return;

        Categories[index] = category;
    }
}


