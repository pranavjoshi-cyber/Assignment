// server.js
import express from 'express';
import { connect, model } from 'mongoose';
import { json } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());

connect('mongodb://localhost/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true });

// to define define Model
const Task = model('Task', {
    title: String,
    description: String,
});

//API Endpoints

// GET all
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single task
app.get('/tasks/:id', getTask, (req, res) => {
    res.json(res.task);
});

// POST 
app.post('/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT by id
app.put('/tasks/:id', getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }

    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE by id
app.delete('/tasks/:id', getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.task = task;
    next();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
