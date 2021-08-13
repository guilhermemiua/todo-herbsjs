const server = require('./infra/api/server');
const config = require('./config');

server.start(config).catch((err) => {
  console.error('----- Fatal error -----');
  console.error(err);
  process.exit(1);
});
