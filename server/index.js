import db from './models/index.js';
import Fastify from 'fastify';
import loadData from './models/loadData.js';
import routes from './routes/index.js';

await db.sync({ force: true });
await loadData();

const HTTP_PORT = process.env.PORT || 8080;

const app = Fastify({
  logger: true,
});

routes(app);
app.listen(HTTP_PORT, async () => {
  console.log('Service running');
});

process.on('unhandledRejection', (reason) => {
  console.error(reason);
  throw reason;
});
