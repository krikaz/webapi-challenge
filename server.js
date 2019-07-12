const express = require('express');
const server = express();
const projectRoutes = require('./data/helpers/projectRoutes').router;
const actionRoutes = require('./data/helpers/actionRoutes');

server.use(express.json());
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

module.exports = server;
