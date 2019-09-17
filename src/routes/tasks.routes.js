const express = require('express');
const router = express.Router();

const Task = require('../models/task');

// Get All Tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.send(error);
    }
});

// Get One Task
router.get('/:id', async (req, res) => {
    try {
        const oneTask = await Task.findById(req.params.id);
        res.json(oneTask);
    } catch (error) {
        res.send(error);
    }
});

// Post New Task
router.post('/', async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const newTask = new Task({
        title,
        description
    });
    try {
        await newTask.save();
    } catch (error) {
        res.send(error);
    }

    res.json({
        status: 'task saved'
    });
});

// Edit Task
router.put('/:id', async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
        });
    } catch (error) {
        res.send(error);
    }
    res.json({
        status: 'task updated'
    });
});

//Delete Task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.send(error);
    }
    res.json({
        status: 'task deleted'
    });
});

module.exports = router;