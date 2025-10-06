const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = { ...req.body, id: tasks.length + 1 };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        res.json(tasks[index]);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});