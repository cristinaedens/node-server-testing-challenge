const express = require('express');
const userRouter = require('../users/userRouter');

const server = express();

server.use(express.json());
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Edens Code' });
});

module.exports = server;