const express = require('express');
const { Product } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send({ message: "Categories retrived successfully", categories });
});
