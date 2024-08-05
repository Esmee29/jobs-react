const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/jobs.json'); // Adjust the path if jobs.json is located elsewhere
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router); // Prefix all routes with /api

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
