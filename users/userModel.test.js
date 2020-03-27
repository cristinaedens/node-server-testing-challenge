const db = require('../data/dbconfig');
const request = require('supertest');
const server = require('../api/server');
const Users = require('./userModel');
const { add, remove } = require('./userModel')

describe('server.js', () => {
    describe('GET /api/users', () => {
        it('should return 200 status', async() => {
            const res = await request(server).get('/api/users');
            expect(res.status).toBe(200);
        });
        it('should return JSON', async() => {
            const res = await request(server).get('/api/users');
            expect(res.type).toMatch(/JSON/i);
        });
    });
})

describe('user model', function() {
    describe('insert()', function() {
        beforeEach(async() => {
            await db('users').truncate();
        })
        it('should add a username', async function() {
            await add({ username: 'cristina' });
            const users = await db('users');
            expect(users).toHaveLength(1);
            expect(users[0].username).toBe('cristina')
        })
        it('should return JSON', async() => {
            const res = await request(server).post('/api/users').send({ username: 'cristina' });
            expect(res.type).toMatch(/JSON/i);
        });
    })
})

describe('DELETE  /api/users/:id', () => {
    it('should return a 200 status', async() => {
        await request(server).post('/api/users').send({ username: 'cristina' });
        const res = await request(server).delete('/api/users/1');
        expect(res.status).toBe(200);
    });
    it('should return JSON', async() => {
        await request(server).post('/api/users').send({ username: 'cristina' });
        const res = await request(server).delete('/api/users/1');
        expect(res.type).toMatch(/JSON/i);
    });
})