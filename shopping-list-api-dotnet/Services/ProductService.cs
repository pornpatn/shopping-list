using ShoppingApi.Models;

namespace ShoppingApi.Services;

public static class ProductService
{
    static List<Product> Products { get; }
    static int nextId = 3;
    static ProductService()
    {
        Products = new List<Product>
        {
            new Product {
                Id = 1,
                Name = "Chicken",
                CategoryId = 1,
                TagIds = new List<int>() { 1 },
                Units = new List<string>() { "cases" },
                Note = ""
            },
            new Product {
                Id = 2,
                Name = "Tomato",
                CategoryId = 2,
                TagIds = new List<int>() { 1 },
                Units = new List<string>() { "cases" },
                Note = ""
            }
        };
    }

    public static List<Product> GetAll() => Products;

    public static Product? Get(int id) => Products.FirstOrDefault(c => c.Id == id);

    public static void Add(Product product)
    {
        product.Id = nextId++;
        Products.Add(product);
    }

    public static void Delete(int id)
    {
        var product = Get(id);
        if (product is null)
            return;

        Products.Remove(product);
    }

    public static void Update(Product product)
    {
        var index = Products.FindIndex(c => c.Id == product.Id);
        if (index == -1)
            return;

        Products[index] = product;
    }
}


