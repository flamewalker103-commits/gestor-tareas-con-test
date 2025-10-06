const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let tareas = [];

app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const tarea = {...req.body, id: tareas.length + 1};
    tareas.push(tarea);
    res.status(201).json(tarea);
});

app.put('/tareas/:id', (req, res) => {
    const { id } = req.params;
    const index = tareas.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
        tareas[index] = { ...tareas[index], ...req.body };
        res.json(tareas[index]);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

app.delete('/tareas/:id', (req, res) => {
    const { id } = req.params;
    tareas = tareas.filter(t => t.id !== parseInt(id));
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
