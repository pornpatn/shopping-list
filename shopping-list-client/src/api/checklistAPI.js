const db = {};

let nextCategoryId = 5;
db.categories = [
    { id: '1', name: 'Meats' },
    { id: '2', name: 'Vegetagles' },
    { id: '3', name: 'Beverages' },
    { id: '4', name: 'Packages' },
];

export const fetchCategories = async () => db.categories;

export const createCategory = async (data) => {
    const newItem = { ...data, id: nextCategoryId++ };
    db.categories = [ ...db.categories, newItem ];
    return newItem;
};

export const updateCategory = async (data) => {
    db.categories = db.categories.map(item => item.id === data.id ? data : item);
    return data;
}

export const deleteCategory = async (id) => {
    db.categories = db.categories.filter(item => item.id !== id);
    return id;
}

let nextMarketId = 7;
db.markets = [
    { id: 1, name: 'Thai Market N & N' },
    { id: 2, name: 'Wonder Produce' },
    { id: 3, name: 'S.J Distributors' },
    { id: 4, name: 'Costco' },
    { id: 5, name: 'Sysco' },
    { id: 6, name: 'Restaurant Depot' },
];

export const fetchMarkets = async () => db.markets;

export const createMarket = async (data) => {
    const newItem = { ...data, id: nextMarketId++ };
    db.markets = [ ...db.markets, newItem ];
    return newItem;
};

export const updateMarket = async (data) => {
    db.markets = db.markets.map(item => item.id === data.id ? data : item);
    return data;
}

export const deleteMarket = async (id) => {
    db.markets = db.markets.filter(item => item.id !== id);
    return id;
}

let nextProductId = 4;
db.products = [
    {
        id: '1',
        name: 'Chicken',
        category: { id: '1', name: 'Meats' },
        tags: [ { id: '1', name: 'Freezer' } ],
        unit: 'case',
        description: 'Regular chicken',
    },
    {
        id: '2',
        name: 'Beef',
        category: { id: '1', name: 'Meats' },
        tags: [ { id: '1', name: 'Freezer' } ],
        unit: 'case',
        description: 'Flap meat',
    },
    {
        id: '3',
        name: 'Tomato',
        category: { id: '2', name: 'Vegetagles' },
        tags: [ { id: '2', name: 'Walkin' } ],
        unit: 'case',
        description: 'Roma Tomato',
    },
];

export const fetchProducts = async () => db.products;

export const createProduct = async (data) => {
    const newItem = { ...data, id: nextProductId++ };
    db.products = [ ...db.products, newItem ];
    return newItem;
};

export const updateProduct = async (data) => {
    db.products = db.products.map(item => item.id === data.id ? data : item);
    return data;
}

export const deleteProduct = async (id) => {
    db.products = db.products.filter(item => item.id !== id);
    return id;
}

let nextTagId = 4;
db.tags = [
    { id: '1', name: 'Freezer' },
    { id: '2', name: 'Walkin' },
    { id: '3', name: 'Shelves' },
];

export const fetchTags = async () => db.tags;

export const createTag = async (data) => {
    const newItem = { ...data, id: nextTagId++ };
    db.tags = [ ...db.tags, newItem ];
    return newItem;
};

export const updateTag = async (data) => {
    db.tags = db.tags.map(item => item.id === data.id ? data : item);
    return data;
}

export const deleteTag = async (id) => {
    db.tags = db.tags.filter(item => item.id !== id);
    return id;
}

export default {
    fetchCategories, createCategory, updateCategory, deleteCategory, 
    fetchMarkets, createMarket, updateMarket, deleteMarket,
    fetchProducts, createProduct, updateProduct, deleteProduct,
    fetchTags, createTag, updateTag, deleteTag,
};
