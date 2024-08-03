// api/index.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/jobs.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

module.exports = server;
