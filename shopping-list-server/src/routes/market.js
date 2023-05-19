const express = require('express');
const { Market } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const markets = await Market.find({});
    res.send({ message: "Markets retrived successfully", markets });
});

router.get('/:id', async (req, res) => {
    try {
        const market = await Market.findOne({ _id: req.params.id });
        res.send({ message: 'Market retrived successfully', market });
    } catch {
        res.status(404).send({ message: "Market doesn't exist!" });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMarket = await Market.create(req.body);
        res.send({ message: 'Market created successfully', market: newMarket }).status(201);
    } catch {
        res.status(404).send({ message: "Market could not be created" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const market = await Market.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({ message: 'Update market successfully', market });
    } catch {
        res.status(404).send({ message: "Market doesn't exist!" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const market = await Market.deleteOne({ _id: req.params.id });
        res.status(204).send({ message: 'Delete market successfully' });
    } catch {
        res.status(404).send({ message: "Market doesn't exist!" });
    }
});
