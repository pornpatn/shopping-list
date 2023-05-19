const express = require('express');
const { Checklist } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const checklists = await Checklist.find({}).populate("items.product");
    res.send({ message: "Checklists retrived successfully", checklists });
});

router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findOne({ _id: req.params.id }).populate("items.product");
        res.send({ message: 'Checklist retrived successfully', checklist });
    } catch {
        res.status(404).send({ message: "Checklist doesn't exist!" });
    }
});

router.post('/', async (req, res) => {
    try {
        const newChecklist = await Checklist.create(req.body);
        res.send({ message: 'Checklist created successfully', checklist: newChecklist }).status(201);
    } catch {
        res.status(404).send({ message: "Checklist could not be created" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({ message: 'Update checklist successfully', checklist });
    } catch {
        res.status(404).send({ message: "Checklist doesn't exist!" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.deleteOne({ _id: req.params.id });
        res.status(204).send({ message: 'Delete checklist successfully' });
    } catch {
        res.status(404).send({ message: "Checklist doesn't exist!" });
    }
});
