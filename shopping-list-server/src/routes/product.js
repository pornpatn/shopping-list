const express = require('express');
const { Product } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send({ message: "Products retrived successfully", products });
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.send({ message: 'Product retrived successfully', product });
    } catch {
        res.status(404).send({ message: "Product doesn't exist!" });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.send({ message: 'Product created successfully', product: newProduct }).status(201);
    } catch {
        res.status(404).send({ message: "Product could not be created" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({ message: 'Update product successfully', product });
    } catch {
        res.status(404).send({ message: "Product doesn't exist!" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        res.status(204).send({ message: 'Delete product successfully' });
    } catch {
        res.status(404).send({ message: "Product doesn't exist!" });
    }
});
