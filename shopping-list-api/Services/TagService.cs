using ShoppingApi.Models;

namespace ShoppingApi.Services;

public static class TagService
{
    static List<Tag> Tags { get; }
    static int nextId = 5;
    static TagService()
    {
        Tags = new List<Tag>
        {
            new Tag { Id = 1, Name = "Walk In", Note = "" },
            new Tag { Id = 2, Name = "Freezer", Note = "" },
            new Tag { Id = 3, Name = "Kitchen", Note = "" },
            new Tag { Id = 4, Name = "Dining", Note = "" }
        };
    }

    public static List<Tag> GetAll() => Tags;

    public static Tag? Get(int id) => Tags.FirstOrDefault(t => t.Id == id);

    public static void Add(Tag tag)
    {
        tag.Id = nextId++;
        Tags.Add(tag);
    }

    public static void Delete(int id)
    {
        var tag = Get(id);
        if (tag is null)
            return;

        Tags.Remove(tag);
    }

    public static void Update(Tag tag)
    {
        var index = Tags.FindIndex(t => t.Id == tag.Id);
        if (index == -1)
            return;

        Tags[index] = tag;
    }
}


