import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('src/jobs.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
