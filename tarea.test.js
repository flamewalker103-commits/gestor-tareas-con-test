const request = require('supertest');
const app = require('./index');

describe('Gestor de Tareas', () => {
    it('debería agregar una tarea', async () => {
        const response = await request(app).post('/tareas').send({ nombre: 'Tarea 1', completada: false });
        expect(response.statusCode).toBe(201);
        expect(response.body.nombre).toBe('Tarea 1');
    });

    it('debería listar las tareas', async () => {
        const response = await request(app).get('/tareas');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});