namespace ShoppingApi.Models;

public class Product
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? CategoryId { get; set; }
    public List<int>? TagIds { get; set; }
    public List<string> Units { get; set; }
    public string? Note { get; set; }    
}